import * as core from '@actions/core'
import * as dotenv from 'dotenv'
import * as fs from 'fs'
import * as dotenvExpand from 'dotenv-expand'
import path from 'path'
import {DotenvParseOutput} from 'dotenv'

async function run(): Promise<void> {
  const ifNoFilesFound: string = core.getInput('if-file-not-found')
  const inputPath: string = core.getInput('path')
  const quiet: boolean = core.getBooleanInput('quiet')
  const filenames = core.getInput('filenames')
  const expand: boolean = core.getBooleanInput('expand')

  const fullDirectory = path.resolve(inputPath)
  let mergedObject: DotenvParseOutput = {}

  for (const name of filenames.split('\n').map(value => value.trim())) {
    const fullPath = path.join(fullDirectory, name)

    if (!fs.existsSync(fullPath)) {
      switch (ifNoFilesFound) {
        case 'warn': {
          core.warning(`${name} file not found in '${fullDirectory}'`)
          break
        }
        case 'error': {
          core.setFailed(`${name} file not found in '${fullDirectory}'`)
          break
        }
        case 'ignore': {
          core.info(`${name} file not found in '${fullDirectory}'`)
          break
        }
      }
      return
    }

    if (!quiet) {
      core.info(`Loading ${fullPath}`)
    }

    const env = dotenv.parse(fs.readFileSync(fullPath))
    mergedObject = {...mergedObject, ...env}
  }

  core.debug(`Merged object before expansion: ${JSON.stringify(mergedObject)}`)

  if (expand) {
    if (!quiet) {
      core.info('Expanding variables')
    }
    const dotenvExpandOutput = dotenvExpand.expand({parsed: mergedObject})
    if (dotenvExpandOutput.error) {
      throw dotenvExpandOutput.error
    }
    if (!dotenvExpandOutput.parsed) {
      throw new Error('No parsed output from dotenv-expand')
    }
    mergedObject = dotenvExpandOutput.parsed
  }

  core.debug(`Merged object after expansion: ${JSON.stringify(mergedObject)}`)

  if (!quiet) {
    core.info('Setting environment variables')
  }

  for (const entry of Object.entries(mergedObject)) {
    if (!quiet) {
      core.info(`${entry[0]} = ${entry[1]}`)
    }
    core.exportVariable(entry[0], entry[1])
  }
}

run().catch(error => core.setFailed(error.message))
