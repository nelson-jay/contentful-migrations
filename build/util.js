"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareEnvironments = exports.getIDs = exports.getIsoDate = void 0;
function compareLatestEntries(development, master) {
    const matchingIDs = [];
    development.map((el) => {
        const matchingID = master.find((masterEl) => masterEl === el);
        // if the id doesn't exist on master we want the id's to migrate the new entry
        if (!matchingID) {
            matchingIDs.push(el);
        }
        else {
            /*
                TODO: check if the dev environment entry is more up-to-date then the master
                if it is then migrate it to the master otherwise ignore it
            */
        }
    });
    return matchingIDs;
}
// returns a date in ISO string format from one month ago
function getIsoDate() {
    // get a date object for the current time
    const d = new Date();
    // set date to one month ago
    d.setMonth(d.getMonth() - 1);
    // zero the time comment
    d.setHours(0, 0, 0, 0);
    return d.toISOString();
}
exports.getIsoDate = getIsoDate;
function getIDs(ids) {
    let selectedIDs = [];
    ids.forEach((el) => {
        return selectedIDs.push(el.sys.id);
    });
    return selectedIDs;
}
exports.getIDs = getIDs;
function compareEnvironments(development, master) {
    return {
        ids: compareLatestEntries(development.ids, master.ids),
        assetIDs: compareLatestEntries(development.assetIDs, master.assetIDs)
    };
}
exports.compareEnvironments = compareEnvironments;
//# sourceMappingURL=util.js.map