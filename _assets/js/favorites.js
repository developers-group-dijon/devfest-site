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

const STORAGE_KEY_PREFIX = "devfest-favorites:";
const HASH_PARAM = "fav";
const CHANGE_EVENT = "favorites:change";

/** @type {?Set<string>} null = manifeste absent, on ne filtre pas */
const KNOWN_IDS = loadManifest();

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
  const raw = readStorageRaw();
  const filtered = filterKnown(raw);
  if (filtered.length !== raw.length) {
    writeStorage(filtered);
  }
  return raw.length - filtered.length;
})();

/**
 * @returns {?Set<string>}
 */
function loadManifest() {
  try {
    const node = document.getElementById("sessions-manifest");
    if (!node || !node.textContent) {
      return null;
    }
    const parsed = JSON.parse(node.textContent);
    if (!Array.isArray(parsed)) {
      return null;
    }
    return new Set(parsed.filter((id) => typeof id === "string" && id));
  } catch {
    return null;
  }
}

/**
 * Filtre une liste d'ids contre le manifeste. Si le manifeste est
 * absent (lecture impossible), retourne la liste telle quelle.
 * @param {string[]} ids
 * @returns {string[]}
 */
function filterKnown(ids) {
  if (!KNOWN_IDS) {
    return ids;
  }
  return ids.filter((id) => KNOWN_IDS.has(id));
}

/**
 * @returns {string}
 */
function storageKey() {
  const edition = document.body?.dataset?.edition || "default";
  return `${STORAGE_KEY_PREFIX}${edition}`;
}

/**
 * Lit la liste brute du localStorage, sans filtrage.
 * @returns {string[]}
 */
function readStorageRaw() {
  try {
    const raw = window.localStorage.getItem(storageKey());
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw);
    if (parsed && Array.isArray(parsed.ids)) {
      return parsed.ids.filter((id) => typeof id === "string" && id.length > 0);
    }
    return [];
  } catch {
    return [];
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
  return filterKnown(readStorageRaw());
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
  const current = list();
  const idx = current.indexOf(id);
  const next = idx === -1 ? [...current, id] : current.filter((x) => x !== id);
  writeStorage(next);
  emitChange(next);
  return next;
}

/**
 * @param {string[]} ids
 * @returns {string[]}
 */
export function set(ids) {
  const cleaned = ids.filter((id) => typeof id === "string" && id);
  const next = [...new Set(filterKnown(cleaned))];
  writeStorage(next);
  emitChange(next);
  return next;
}

/**
 * @param {string[]} ids
 * @returns {string[]}
 */
export function merge(ids) {
  const cleaned = ids.filter((id) => typeof id === "string" && id);
  const next = [...new Set([...list(), ...filterKnown(cleaned)])];
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
  const hash = window.location.hash.startsWith("#")
    ? window.location.hash.slice(1)
    : window.location.hash;
  if (!hash) {
    return null;
  }
  const params = new URLSearchParams(hash);
  const raw = params.get(HASH_PARAM);
  if (raw == null) {
    return null;
  }
  if (raw === "") {
    return { ids: [], dropped: 0 };
  }
  const decoded = raw
    .split(",")
    .map((id) => decodeURIComponent(id.trim()))
    .filter((id) => id.length > 0);
  const filtered = filterKnown(decoded);
  return { ids: filtered, dropped: decoded.length - filtered.length };
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
  const encoded = ids.map((id) => encodeURIComponent(id)).join(",");
  const base = `${window.location.origin}${pagePath}`;
  return encoded ? `${base}#${HASH_PARAM}=${encoded}` : base;
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
