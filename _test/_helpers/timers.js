/* eslint-disable jsdoc/reject-any-type */
// Helper de timers déterministes pour les tests qui exercent du
// `setTimeout` / `clearTimeout` (typiquement les debounces côté
// navigateur). Au lieu d'attendre un délai réel — fragile en CI lente
// et peu lisible — on remplace `window.setTimeout` / `window.clearTimeout`
// par une file de callbacks que le test vide manuellement via `flush()`.
//
// Limites volontaires :
// - le `delay` est ignoré (on n'ordonne pas les callbacks par échéance) ;
//   suffisant pour les debounces qui ne posent qu'un seul timer à la fois.
// - le retour de `setTimeout` est un id numérique propre à ce helper ;
//   ne pas mélanger avec un setTimeout natif sur la même fenêtre jsdom.

/**
 * @typedef Controller
 * @property {() => void} flush vide la file et exécute les callbacks pending
 * @property {() => void} restore restaure les setTimeout/clearTimeout d'origine
 */

/**
 * Doit être appelé APRÈS `setupDOM(...)` pour que `globalThis.window`
 * soit disponible.
 * @returns {Controller}
 */
export function installFakeTimers() {
  const win = globalThis.window;
  const origSetTimeout = win.setTimeout;
  const origClearTimeout = win.clearTimeout;

  /** @type {(?(() => void))[]} */
  const pending = [];

  win.setTimeout = /** @type {any} */ (
    (cb) => {
      const id = pending.length;
      pending.push(typeof cb === "function" ? cb : null);
      return id;
    }
  );
  win.clearTimeout = /** @type {any} */ (
    (id) => {
      if (typeof id === "number" && id >= 0 && id < pending.length) {
        pending[id] = null;
      }
    }
  );

  return {
    flush() {
      // Snapshot avant exécution : si un callback re-pose un setTimeout
      // pendant son exécution, on ne le flush pas dans le même tour
      // (sémantique des fake timers la plus prévisible).
      const toRun = pending.splice(0);
      for (const cb of toRun) {
        if (cb) cb();
      }
    },
    restore() {
      win.setTimeout = origSetTimeout;
      win.clearTimeout = origClearTimeout;
    },
  };
}
