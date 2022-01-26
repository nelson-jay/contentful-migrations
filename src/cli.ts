import * as util from 'util';
import { getIdsForMigration } from "./contentful";
const exec = util.promisify(require('child_process').exec);

export class CLI {
    constructor() {
        this.executeCLI();
    }

    public async executeCLI() {
        const { ids, assetIDs } = await getIdsForMigration();

        try {
            const { stdout, stderr } = await exec(`cd src/migrations; contentful space export --config exportConfig.json --queryEntries 'sys.id=${ids}' --queryAssets 'sys.id=${assetIDs}'`)
            
            if (stderr) {
                console.log('stderr:', stderr);
            }
            
            console.log('stdout:', stdout);
            
        } catch(e) {
            console.log(e)
        }

        // TODO: write a retry function to capture unresolved links
        try {
            const { stdout, stderr } = await exec(`cd src/migrations; contentful space import --config importConfig.json`)

            if (stderr) {
                console.log('stderr:', stderr);
            }

            console.log('stdout:', stdout);
        } catch(e) {
            console.log(e);
        }

    }
}