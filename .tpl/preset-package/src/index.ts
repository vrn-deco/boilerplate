#!/usr/bin/env node
import path from 'path'
import fs from 'fs-extra'
import minimist from 'minimist'
import execa from 'execa'
import { logger } from '@ombro/logger'

import {
  CustomScriptType,
  PresetOptions,
  PresetRunner,
  VRNBoilerplateConfig,
} from '@vrn-deco/boilerplate-protocol'

const RUNNER_NAME = '{{RUNNER_NAME}}'

// implements PresetRunner
export const runner: PresetRunner = async (opts: Partial<PresetOptions>) => {
  logger.verbose(`<${RUNNER_NAME}> startup...`)

  const argv = minimist(process.argv.slice(2))
  // prepare and params validate...
  const {
    targetDir = argv['target-dir'] ?? argv.targetDir ?? process.cwd(),
    boiPackageDir = argv['boi-package-dir'] ?? argv.boiPackageDir,
    name = argv.name,
    version = argv.version,
    author = argv.author,
  } = opts

  logger.verbose(`targetDir: ${targetDir}`)
  logger.verbose(`boiPackageDir: ${boiPackageDir}`)
  logger.verbose(`name: ${name}`)
  logger.verbose(`version: ${version}`)
  logger.verbose(`author: ${author}`)

  if (!targetDir) throw new Error('targetDir is required')
  if (!boiPackageDir) throw new Error('boiPackageDir is required')
  if (!name) throw new Error('name is required')
  if (!version) throw new Error('version is required')
  if (!author) throw new Error('author is required')

  fs.mkdirpSync(targetDir)

  const boiConfigFile = path.join(boiPackageDir, 'vrn-boilerplate.json')
  if (!fs.existsSync(boiConfigFile)) throw new Error('vrn-boilerplate.json is not exists.')
  const boiConfig: VRNBoilerplateConfig = fs.readJsonSync(boiConfigFile)

  const boiDir = path.resolve(boiPackageDir, 'boilerplate')
  logger.verbose(`boiDir: ${boiDir}`)
  if (!fs.pathExistsSync(boiDir)) throw new Error('boilerplate directory is not exists.')

  // execute preset handler or custom script
  await initHandler()
  await installHandler()
  await cleanHandler()

  logger.verbose(`<${RUNNER_NAME}> finished.`)

  /**
   * init step
   */
  async function initHandler() {
    logger.verbose(`<${RUNNER_NAME}> -> initHandler`)
    // using custom script...
    if (boiConfig.init) {
      execCustomScript(boiConfig.init.scriptType, boiConfig.init.scriptFile)
      return
    }

    // do something...
  }

  /**
   * install step
   */
  async function installHandler() {
    logger.verbose(`<${RUNNER_NAME}> -> installHandler`)
    // using custom script...
    if (boiConfig.install) {
      execCustomScript(boiConfig.install.scriptType, boiConfig.install.scriptFile)
      return
    }

    // copy boilerplate files to targetDir...
    fs.copySync(boiDir, targetDir)

    // do something...
  }

  /**
   * clean step
   */
  async function cleanHandler() {
    logger.verbose(`<${RUNNER_NAME}> -> cleanHandler`)
    // using custom script...
    if (boiConfig.clean) {
      execCustomScript(boiConfig.clean.scriptType, boiConfig.clean.scriptFile)
      return
    }

    // do something...
  }

  function execCustomScript(scriptType: CustomScriptType, scriptFile: string) {
    const scriptInterpreter: Record<CustomScriptType, string> = {
      sh: 'bash',
      js: 'node',
      py: 'python3',
    }
    const absoluteScriptFile = path.join(boiDir, scriptFile)
    logger.verbose(`exec custom script: ${absoluteScriptFile}`)
    execa.sync(
      scriptInterpreter[scriptType] ?? scriptInterpreter.sh,
      [absoluteScriptFile, `--name`, name, `--version`, version, `--author`, author],
      {
        stdio: 'inherit',
        cwd: targetDir,
      },
    )
  }
}

if (require.main === module) {
  runner({})
}
