"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIdsForMigration = exports.returnIDs = exports.getIds = exports.diff = void 0;
const tslib_1 = require("tslib");
const contentful = (0, tslib_1.__importStar)(require("contentful"));
const util = (0, tslib_1.__importStar)(require("./util"));
exports.diff = [
    {
        environment: 'development',
        ids: [],
        assetIDs: []
    },
    {
        environment: 'master',
        ids: [],
        assetIDs: []
    }
];
async function getIds(environment = 'development') {
    const client = contentful.createClient({
        space: process.env.spaceId,
        environment,
        accessToken: process.env.accessToken
    });
    // TODO: exclude code with a 'do not publish' tag being picked up
    try {
        const entries = await client.getEntries({
            'sys.updatedAt[gte]': util.getIsoDate(),
            limit: 1000
        });
        const assets = await client.getAssets({
            'sys.updatedAt[gte]': util.getIsoDate(),
            limit: 1000
        });
        return {
            ids: util.getIDs(entries.items),
            assetIDs: util.getIDs(assets.items)
        };
    }
    catch (error) {
        console.log(error);
    }
}
exports.getIds = getIds;
async function returnIDs() {
    let i = 0;
    for await (const el of exports.diff) {
        const response = await getIds(el.environment);
        if (exports.diff[i].ids?.length) {
            exports.diff[i].ids = response?.ids;
        }
        else {
            exports.diff[i].ids = ['000'];
        }
        if (exports.diff[i].assetIDs?.length) {
            exports.diff[i].assetIDs = response?.assetIDs;
        }
        else {
            exports.diff[i].assetIDs = ['000'];
        }
        i++;
    }
    return util.compareEnvironments(exports.diff[0], exports.diff[1]);
}
exports.returnIDs = returnIDs;
async function getIdsForMigration() {
    return await returnIDs();
}
exports.getIdsForMigration = getIdsForMigration;
//# sourceMappingURL=contentful.js.map