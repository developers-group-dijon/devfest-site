// Logique pure du module favoris (`favorites.js`) — extraite ici pour
// être testable sans DOM, sans localStorage, sans window.location.
// Toutes les transitions (toggle, dédup, filtrage par manifeste) ainsi
// que les opérations d'encodage/décodage (manifeste JSON, hash, URL de
// partage, lecture brute du localStorage) y vivent.
//
// `favorites.js` reste le seul à parler DOM / storage / events : il
// orchestre simplement ces fonctions.

/**
 * Parse le contenu textuel du `<script id="sessions-manifest">` : un
 * tableau JSON d'ids de sessions. Retourne `null` (= pas de manifeste)
 * en cas de contenu vide, manquant, malformé ou non-tableau, pour que
 * `favorites.js` puisse basculer en mode dégradé (sans filtrage).
 * @param {?string} text
 * @returns {?Set<string>}
 */
export function parseManifest(text) {
  if (!text) {
    return null;
  }
  try {
    const parsed = JSON.parse(text);
    if (!Array.isArray(parsed)) {
      return null;
    }
    return new Set(parsed.filter((id) => typeof id === "string" && id));
  } catch {
    return null;
  }
}

/**
 * Parse le contenu brut du localStorage. Format attendu : `{"ids": [...]}`.
 * Toute déviation (string invalide, JSON cassé, pas d'array, valeurs
 * non-string) est tolérée et retourne `[]`.
 * @param {?string} raw
 * @returns {string[]}
 */
export function parseStorageRaw(raw) {
  if (!raw) {
    return [];
  }
  try {
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
 * Filtre une liste d'ids contre le manifeste. Si le manifeste est `null`
 * (absent / mode dégradé), la liste est retournée telle quelle —
 * on évite de tout vider à cause d'un manifeste manquant.
 * @param {string[]} ids
 * @param {?Set<string>} knownIds
 * @returns {string[]}
 */
export function filterKnown(ids, knownIds) {
  if (!knownIds) {
    return ids;
  }
  return ids.filter((id) => knownIds.has(id));
}

/**
 * Calcule la liste résultante d'un `toggle` sur un id : retire l'id
 * s'il est présent, l'ajoute en fin sinon.
 * @param {string[]} current
 * @param {string} id
 * @returns {string[]}
 */
export function toggleId(current, id) {
  const idx = current.indexOf(id);
  return idx === -1 ? [...current, id] : current.filter((x) => x !== id);
}

/**
 * Nettoie une liste entrante (depuis l'extérieur : permalien, API
 * `set`/`merge`) : ne conserve que les chaînes non-vides.
 * @param {unknown[]} ids
 * @returns {string[]}
 */
export function cleanIncoming(ids) {
  /** @type {string[]} */
  const out = [];
  for (const id of ids) {
    if (typeof id === "string" && id.length > 0) {
      out.push(id);
    }
  }
  return out;
}

/**
 * Déduplique en préservant l'ordre d'apparition.
 * @param {string[]} ids
 * @returns {string[]}
 */
export function dedup(ids) {
  return [...new Set(ids)];
}

/**
 * Décode la portion `hash` d'une URL (sans le `#` initial) en cherchant
 * le paramètre `paramName`. Retourne :
 * - `null` si pas de hash ou paramètre absent (= mode normal, pas d'aperçu)
 * - `{ ids: [], dropped: 0 }` si paramètre présent mais vide (`#fav=`)
 * - `{ ids, dropped }` sinon, où `dropped` compte les ids absents du manifeste
 * @param {string} hash
 * @param {string} paramName
 * @param {?Set<string>} knownIds
 * @returns {?{ids: string[], dropped: number}}
 */
export function decodeHash(hash, paramName, knownIds) {
  const cleaned = hash.startsWith("#") ? hash.slice(1) : hash;
  if (!cleaned) {
    return null;
  }
  const params = new URLSearchParams(cleaned);
  const raw = params.get(paramName);
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
  const filtered = filterKnown(decoded, knownIds);
  return { ids: filtered, dropped: decoded.length - filtered.length };
}

/**
 * Construit l'URL de partage. Avec ids vides → URL de base sans `#`.
 * @param {string[]} ids
 * @param {string} origin - ex. `https://devfest-2025.dijon.dev`
 * @param {string} pagePath - ex. `/favoris/`
 * @param {string} paramName - ex. `fav`
 * @returns {string}
 */
export function buildShareUrl(ids, origin, pagePath, paramName) {
  const encoded = ids.map((id) => encodeURIComponent(id)).join(",");
  const base = `${origin}${pagePath}`;
  return encoded ? `${base}#${paramName}=${encoded}` : base;
}
