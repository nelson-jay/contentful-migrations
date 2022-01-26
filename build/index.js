"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.index = void 0;
const tslib_1 = require("tslib");
const config_1 = (0, tslib_1.__importDefault)(require("dotenv/config"));
const cli = (0, tslib_1.__importStar)(require("./cli"));
config_1.default;
function index() {
    return new cli.CLI();
}
exports.index = index;
index();
//# sourceMappingURL=index.js.map