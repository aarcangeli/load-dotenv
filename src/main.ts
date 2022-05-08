import * as core from '@actions/core'
import * as dotenv from 'dotenv'
import * as fs from 'fs'
import path from 'path'

async function run(): Promise<void> {
  const ifNoFilesFound: string = core.getInput('if-file-not-found')
  const inputPath: string = core.getInput('path')
  const quiet: boolean = core.getBooleanInput('quiet')

  const fullDirectory = path.resolve(inputPath)
  const fullPath = path.join(fullDirectory, '.env')

  if (!fs.existsSync(fullPath)) {
    switch (ifNoFilesFound) {
      case 'warn': {
        core.warning(`.env file not found in '${fullDirectory}'`)
        break
      }
      case 'error': {
        core.setFailed(`.env file not found in '${fullDirectory}'`)
        break
      }
      case 'ignore': {
        core.info(`.env file not found in '${fullDirectory}'`)
        break
      }
    }
    return
  }

  const env: object = dotenv.parse(fs.readFileSync(fullPath))

  for (const entry of Object.entries(env)) {
    if (!quiet) {
      core.info(`${entry[0]} = ${entry[1]}`)
    }
    core.exportVariable(entry[0], entry[1])
  }
}

run().catch(error => core.setFailed(error.message))
