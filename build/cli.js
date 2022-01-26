"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CLI = void 0;
const tslib_1 = require("tslib");
const util = (0, tslib_1.__importStar)(require("util"));
const contentful_1 = require("./contentful");
const exec = util.promisify(require('child_process').exec);
class CLI {
    constructor() {
        this.executeCLI();
    }
    async executeCLI() {
        const { ids, assetIDs } = await (0, contentful_1.getIdsForMigration)();
        try {
            const { stdout, stderr } = await exec(`cd src/migrations; contentful space export --config exportConfig.json --queryEntries 'sys.id=${ids}' --queryAssets 'sys.id=${assetIDs}'`);
            if (stderr) {
                console.log('stderr:', stderr);
            }
            console.log('stdout:', stdout);
        }
        catch (e) {
            console.log(e);
        }
        // TODO: write a retry function to capture unresolved links
        try {
            const { stdout, stderr } = await exec(`cd src/migrations; contentful space import --config importConfig.json`);
            if (stderr) {
                console.log('stderr:', stderr);
            }
            console.log('stdout:', stdout);
        }
        catch (e) {
            console.log(e);
        }
    }
}
exports.CLI = CLI;
//# sourceMappingURL=cli.js.map