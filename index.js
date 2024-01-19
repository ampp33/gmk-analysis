import AzureOcr from './azure-ocr.js'
import * as fs from 'fs'
import util from 'util'
const sleep = util.promisify(setTimeout);

import security from "./security.json" assert { type: "json" };

const BASE_GMK_DIR = "C:\\Users\\ampp3\\Desktop\\Projects\\programming\\gmk-keycaps"
const OUTPUT_BASE_DIR = "C:\\Users\\ampp3\\Desktop\\Projects\\programming\\gmk-analysis\\output\\order-img-ocr"
const START_SET = "delta"

const ocr = new AzureOcr(security.azureApiKey, security.azureApiEndpoint)

async function main() {
    let count = 0
    const gmkDirs = fs.readdirSync(BASE_GMK_DIR)
    for(const gmkDir of gmkDirs) {
        const orderFilePath = `${BASE_GMK_DIR}\\${gmkDir}\\order.png`
        const outputJsonPath = `${OUTPUT_BASE_DIR}\\${gmkDir}.json`
        if(fs.existsSync(orderFilePath) && !fs.existsSync(outputJsonPath)) {
            const ocrResults = await ocr.processStream(fs.readFileSync(orderFilePath))
            fs.writeFileSync(outputJsonPath, JSON.stringify(ocrResults))
            count++
            console.info(`${count}/${gmkDirs.length} - done processing ${gmkDir}!`)
            // wait to avoid rate limit
            await sleep(12000);
            // break
        } else {
            console.info(`${gmkDir} doesn't have an order image or already processed, ignoring...`)
        }
        
    }
}

main()