// Module core de gestion des favoris.
// Source unique de vérité pour le localStorage, l'encodage du permalien
// et l'événement "favorites:change" diffusé sur `document`.
//
// La clé localStorage est scopée par édition (lue depuis
// `document.body.dataset.edition`) pour ne pas mélanger les sélections
// d'une année à l'autre.
//
// Les ids inconnus (sessions retirées de l'édition courante ou venant
// d'un permalien d'une édition différente) sont filtrés contre le
// manifeste embarqué dans la page (`<script type="application/json"
// id="sessions-manifest">[...]</script>`). Sans manifeste (par exemple
// si la balise est absente), le filtrage est désactivé pour éviter
// une régression silencieuse qui ferait disparaître tous les favoris.
//
// La logique pure (parsing, filtrage, toggle, encode/decode hash, build
// share URL) vit dans `./favorites-utils.js` et est testée séparément
// sans DOM ni localStorage.

import {
  parseManifest,
  parseStorageRaw,
  filterKnown,
  toggleId,
  cleanIncoming,
  dedup,
  decodeHash,
  buildShareUrl as buildShareUrlPure,
} from "./favorites-utils.js";

const STORAGE_KEY_PREFIX = "devfest-favorites:";
const HASH_PARAM = "fav";
const CHANGE_EVENT = "favorites:change";

/** @type {?Set<string>} null = manifeste absent, on ne filtre pas */
const KNOWN_IDS = (() => {
  const node = document.getElementById("sessions-manifest");
  return parseManifest(node?.textContent ?? null);
})();

/**
 * Nombre d'ids du `localStorage` retirés au chargement du module
 * parce qu'absents du manifeste. Capturé une seule fois pour pouvoir
 * informer l'utilisateur après l'auto-purge.
 * @type {number}
 */
const INIT_DROPPED = (() => {
  if (!KNOWN_IDS) {
    return 0;
  }
  const raw = parseStorageRaw(readStorageString());
  const filtered = filterKnown(raw, KNOWN_IDS);
  if (filtered.length !== raw.length) {
    writeStorage(filtered);
  }
  return raw.length - filtered.length;
})();

/**
 * @returns {string}
 */
function storageKey() {
  const edition = document.body?.dataset?.edition || "default";
  return `${STORAGE_KEY_PREFIX}${edition}`;
}

/**
 * @returns {?string}
 */
function readStorageString() {
  try {
    return window.localStorage.getItem(storageKey());
  } catch {
    return null;
  }
}

/**
 * @param {string[]} ids
 */
function writeStorage(ids) {
  try {
    window.localStorage.setItem(storageKey(), JSON.stringify({ ids }));
  } catch {
    // Quota dépassé ou storage indisponible : on ignore silencieusement.
  }
}

/**
 * @param {string[]} ids
 */
function emitChange(ids) {
  document.dispatchEvent(
    new CustomEvent(CHANGE_EVENT, { detail: { ids: [...ids] } }),
  );
}

/**
 * @returns {Set<string>} manifeste des ids valides (set vide si absent)
 */
export function knownIds() {
  return KNOWN_IDS ?? new Set();
}

/**
 * Liste des favoris locaux, filtrée contre le manifeste. La purge
 * éventuelle du `localStorage` a été effectuée au chargement du
 * module (cf. `INIT_DROPPED`).
 * @returns {string[]}
 */
export function list() {
  return filterKnown(parseStorageRaw(readStorageString()), KNOWN_IDS);
}

/**
 * Nombre d'ids du `localStorage` qui ont été ignorés (et purgés)
 * au chargement du module parce qu'absents du manifeste. Permet
 * d'informer l'utilisateur que sa sélection a été nettoyée.
 * @returns {number}
 */
export function initialDropped() {
  return INIT_DROPPED;
}

/**
 * @param {string} id
 * @returns {boolean}
 */
export function has(id) {
  return list().includes(id);
}

/**
 * @param {string} id
 * @returns {string[]} nouvelle liste après bascule
 */
export function toggle(id) {
  const next = toggleId(list(), id);
  writeStorage(next);
  emitChange(next);
  return next;
}

/**
 * @param {string[]} ids
 * @returns {string[]}
 */
export function set(ids) {
  const next = dedup(filterKnown(cleanIncoming(ids), KNOWN_IDS));
  writeStorage(next);
  emitChange(next);
  return next;
}

/**
 * @param {string[]} ids
 * @returns {string[]}
 */
export function merge(ids) {
  const next = dedup([
    ...list(),
    ...filterKnown(cleanIncoming(ids), KNOWN_IDS),
  ]);
  writeStorage(next);
  emitChange(next);
  return next;
}

/**
 * Décode `#fav=id1,id2,...` et filtre les ids contre le manifeste.
 * Retourne `null` si pas de hash, sinon `{ ids, dropped }` où `dropped`
 * est le nombre d'ids du lien qui sont introuvables dans l'édition
 * courante.
 * @returns {?{ ids: string[], dropped: number }}
 */
export function readHash() {
  return decodeHash(window.location.hash, HASH_PARAM, KNOWN_IDS);
}

/**
 * Retire `#fav=...` de l'URL sans recharger.
 */
export function clearHash() {
  const url = new URL(window.location.href);
  url.hash = "";
  window.history.replaceState(null, "", url.pathname + url.search);
}

/**
 * Construit l'URL absolue du permalien partageable.
 * @param {string[]} ids
 * @param {string=} pagePath chemin de la page cible (défaut `/favoris/`)
 * @returns {string}
 */
export function buildShareUrl(ids, pagePath = "/favoris/") {
  return buildShareUrlPure(ids, window.location.origin, pagePath, HASH_PARAM);
}

/**
 * @param {(ids: string[]) => void} handler
 * @returns {() => void} fonction de désinscription
 */
export function onChange(handler) {
  /** @param {Event} e */
  const wrapped = (e) => {
    const detail = /** @type {CustomEvent<{ids: string[]}>} */ (e).detail;
    handler(detail?.ids ?? []);
  };
  document.addEventListener(CHANGE_EVENT, wrapped);
  return () => document.removeEventListener(CHANGE_EVENT, wrapped);
}
