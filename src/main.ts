import * as core from '@actions/core'
import * as dotenv from 'dotenv'
import * as fs from 'fs'

async function run(): Promise<void> {
  const path: string = core.getInput('path')
  const quiet: boolean = core.getBooleanInput('quiet')

  const env: object = dotenv.parse(fs.readFileSync(`${path}/.env`))

  for (const entry of Object.entries(env)) {
    if (!quiet) {
      core.info(`${entry[0]} = ${entry[1]}`)
    }
    core.exportVariable(entry[0], entry[1])
  }
}

run().catch(error => core.setFailed(error.message))
