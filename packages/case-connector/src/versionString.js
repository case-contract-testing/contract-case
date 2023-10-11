"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.versionString = void 0;
var readPackage = require("read-pkg-up");
var pkg = readPackage.sync({ cwd: __dirname }) || {
    packageJson: {
        name: __dirname,
        version: 'unknown',
    },
};
exports.versionString = "".concat(pkg.packageJson.name, "@").concat(pkg.packageJson.version || 'UNKNOWN-VERSION').replace('@contract-case/', '');
