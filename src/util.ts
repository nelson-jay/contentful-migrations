import * as contentful from 'contentful';

function compareLatestEntries (development: any, master: any) {
    const matchingIDs:any  = []

    development.map((el: any) => {
        const matchingID = master.find((masterEl: any) => masterEl === el)
        // if the id doesn't exist on master we want the id's to migrate the new entry
        if (!matchingID) {
            matchingIDs.push(el)
        } else {
            /*  
                TODO: check if the dev environment entry is more up-to-date then the master
                if it is then migrate it to the master otherwise ignore it
            */
        }
    })
    return matchingIDs
}

// returns a date in ISO string format from one month ago
export function getIsoDate (): string {
    // get a date object for the current time
    const d = new Date()

    // set date to one month ago
    d.setMonth(d.getMonth() - 1)

    // zero the time comment
    d.setHours(0, 0, 0, 0)

    return d.toISOString()
}

export function getIDs (ids:contentful.Entry<unknown>[] ):string[] {
    let selectedIDs: Array<string> = []

    ids.forEach((el: contentful.Entry<unknown>) => {
        return selectedIDs.push(el.sys.id)
    });

    return selectedIDs
}


export function compareEnvironments(development: Environment, master: Environment): any {
    return {
        ids: compareLatestEntries(development.ids, master.ids),
        assetIDs: compareLatestEntries(development.assetIDs, master.assetIDs)
    }
}