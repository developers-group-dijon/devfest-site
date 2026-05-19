// Helpers purs de la page "Mon planning" — extraits de `favoris.js`
// pour être testables sans DOM ni side-effects au chargement du module.

/**
 * Regroupe des éléments triés par début en clusters de chevauchement.
 * Deux éléments sont dans le même cluster si l'un chevauche au moins
 * un autre du cluster (relation transitive).
 *
 * Hypothèse : `sortedCards` est trié par `start` croissant.
 * @template {{start: number, end: number}} TCard
 * @param {TCard[]} sortedCards
 * @returns {TCard[][]}
 */
export function buildConflictClusters(sortedCards) {
  /** @type {TCard[][]} */
  const clusters = [];
  /** @type {TCard[]} */
  let current = [];
  let currentEnd = -Infinity;
  for (const card of sortedCards) {
    if (current.length === 0 || card.start < currentEnd) {
      current.push(card);
      currentEnd = Math.max(currentEnd, card.end);
    } else {
      clusters.push(current);
      current = [card];
      currentEnd = card.end;
    }
  }
  if (current.length > 0) {
    clusters.push(current);
  }
  return clusters;
}

/**
 * Pour les cartes d'un jour (toutes les sessions d'une section dans la
 * page favoris), sélectionne celles qui correspondent aux favoris,
 * les trie par début, et identifie les clusters de chevauchement.
 *
 * Générique sur la forme des cartes — le caller (côté DOM) y attache
 * typiquement un `element: HTMLElement` qui est préservé en sortie.
 * @template {{id: string, start: number, end: number}} TCard
 * @param {TCard[]} cards
 * @param {Set<string>} favIds
 * @returns {{visible: TCard[], conflictClusters: TCard[][]}}
 *   - `visible` : cartes retenues, triées par `start` croissant
 *   - `conflictClusters` : clusters de **≥ 2** cartes qui se chevauchent
 *     (les cartes isolées ne sont pas listées ici, mais bien dans `visible`)
 */
export function selectDayCards(cards, favIds) {
  const visible = cards
    .filter((c) => favIds.has(c.id))
    .sort((a, b) => a.start - b.start);
  const conflictClusters = buildConflictClusters(visible).filter(
    (cluster) => cluster.length > 1,
  );
  return { visible, conflictClusters };
}

/**
 * Compose le message d'information affiché quand des sessions ont été
 * retirées d'un planning, soit parce que le permalien pointe vers des
 * sessions inconnues (`hash`), soit parce que le `localStorage`
 * contenait des ids obsolètes (`local`).
 * @param {number} count
 * @param {"hash"|"local"} source
 * @returns {string}
 */
export function droppedMessage(count, source) {
  const plural = count > 1;
  if (source === "hash") {
    return `${count} session${plural ? "s" : ""} du lien ${
      plural ? "sont introuvables" : "est introuvable"
    } et ${plural ? "ont" : "a"} été ignoré${plural ? "es" : "e"}.`;
  }
  return `${count} session${plural ? "s" : ""} de votre planning ${
    plural ? "n'existent plus" : "n'existe plus"
  } dans le programme et ${plural ? "ont" : "a"} été retiré${
    plural ? "es" : "e"
  } de vos favoris.`;
}
