import * as contentful from 'contentful';
import * as util from './util';

export const diff: Array<Environment> = [
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
]

export async function getIds(environment: string = 'development') {
    const client = contentful.createClient({
    space: process.env.spaceId!,
    environment, // defaults to 'master' if not set
    accessToken: process.env.accessToken!
    })  
    
    // TODO: exclude code with a 'do not publish' tag being picked up
    try {
        const entries: contentful.EntryCollection<unknown> = await client.getEntries({
            'sys.updatedAt[gte]': util.getIsoDate(),
            limit: 1000
        })

        const assets: any = await client.getAssets({
            'sys.updatedAt[gte]': util.getIsoDate(),
            limit: 1000
        })

        return {
            ids: util.getIDs(entries.items),
            assetIDs: util.getIDs(assets.items)
        }
    } catch(error) {
        console.log(error)
    }
}

export async function returnIDs() {
    let i: number = 0

    for await (const el of diff) {
        const response = await getIds(el.environment)
        if (diff[i].ids?.length) {
            diff[i].ids = response?.ids
        } else {
            diff[i].ids = ['000']
        }

        if (diff[i].assetIDs?.length) {
            diff[i].assetIDs = response?.assetIDs
        } else {
            diff[i].assetIDs = ['000']
        }

        i++ 
    }
    return util.compareEnvironments(diff[0], diff[1])
}

export async function getIdsForMigration(): Promise<any> {
    return await returnIDs();
}