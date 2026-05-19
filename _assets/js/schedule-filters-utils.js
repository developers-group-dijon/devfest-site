// Logique de filtrage du programme, extraite de `schedule-filters.js`
// pour être testable sans DOM ni jsdom. Le module ne touche pas au
// document : il opère sur des descripteurs plats `SessionDescriptor`.

/**
 * Normalise pour une recherche tolérante : minuscules + retrait des
 * diacritiques (décomposition NFD). Idempotente.
 * @param {string} value
 * @returns {string}
 */
export function normalize(value) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");
}

/**
 * Descripteur plat d'une session — issu du DOM côté `schedule-filters.js`,
 * fabriqué directement côté test.
 * @typedef SessionDescriptor
 * @property {string} id
 * @property {?string} formatId
 * @property {?string} categoryId
 * @property {string} text - texte (titre + speakers + métadonnées) à
 *   chercher ; sera normalisé en interne, peut être brut.
 */

/**
 * État des filtres actifs. `q` est attendu DÉJÀ normalisé (cf. `normalize`)
 * — c'est cohérent avec le code du module navigateur qui normalise une
 * seule fois au moment où l'utilisateur tape.
 * @typedef FilterState
 * @property {Set<string>} format - ids retenus (OR au sein du groupe)
 * @property {Set<string>} category - idem
 * @property {string} q - texte recherché, déjà normalisé ("" si inactif)
 */

/**
 * @param {SessionDescriptor} s
 * @param {FilterState} state
 * @returns {boolean}
 */
function matches(s, state) {
  if (state.format.size > 0 && (!s.formatId || !state.format.has(s.formatId))) {
    return false;
  }
  if (
    state.category.size > 0 &&
    (!s.categoryId || !state.category.has(s.categoryId))
  ) {
    return false;
  }
  if (state.q && !normalize(s.text).includes(state.q)) {
    return false;
  }
  return true;
}

/**
 * Sémantique : AND entre groupes (format ∧ category ∧ q), OR au sein
 * d'un groupe (plusieurs formats sélectionnés = union).
 * @param {SessionDescriptor[]} sessions
 * @param {FilterState} state
 * @returns {Set<string>} ids des sessions visibles après filtrage
 */
export function filterSessions(sessions, state) {
  /** @type {Set<string>} */
  const visible = new Set();
  for (const s of sessions) {
    if (matches(s, state)) {
      visible.add(s.id);
    }
  }
  return visible;
}

/**
 * Indique si au moins un filtre est actif. Utilisé par l'UI pour
 * révéler le bouton "Réinitialiser" et le message d'absence de
 * résultats.
 * @param {FilterState} state
 * @returns {boolean}
 */
export function hasActiveFilters(state) {
  return state.format.size > 0 || state.category.size > 0 || state.q.length > 0;
}
