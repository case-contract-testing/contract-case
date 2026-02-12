/**
 * Webpack loader that renames internal webpack runtime variables in
 * pre-bundled (webpack-compiled) third-party packages.
 *
 * pretty-format v30 ships its CJS build as a webpack bundle with its own
 * __webpack_modules__, __webpack_require__, etc. When our outer webpack
 * processes this file, it replaces bare `require()` calls (e.g.
 * require("react-is")) with __webpack_require__(id). At runtime the inner
 * __webpack_require__ shadows the outer one, so the outer's module ID is
 * looked up in the inner's module map — which fails.
 *
 * By renaming the inner webpack variables, the shadowing is eliminated and
 * the outer webpack can properly resolve and bundle all dependencies.
 */
module.exports = function renameInnerWebpackVars(source) {
  return source
    .replaceAll('__webpack_modules__', '__nested_webpack_modules__')
    .replaceAll('__webpack_module_cache__', '__nested_webpack_module_cache__')
    .replaceAll('__webpack_require__', '__nested_webpack_require__')
    .replaceAll('__webpack_exports__', '__nested_webpack_exports__')
    .replaceAll('__unused_webpack_module', '__unused_nested_webpack_module');
};
