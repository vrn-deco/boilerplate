#!/usr/bin/env node
import path from 'path'
import os from 'os'
import fs from 'fs-extra'
import { execSync } from 'child_process'
import minimist from 'minimist'
import execa from 'execa'
import { logger } from '@ombro/logger'

import type {
  CustomScriptType,
  PresetOptions,
  PresetRunner,
  VRNBoilerplateConfig,
} from '@vrn-deco/boilerplate-protocol'

type ScriptInterpreter = Record<CustomScriptType, string>
const scriptInterpreter: ScriptInterpreter = {
  sh: 'bash',
  js: 'node',
  py: 'python3',
}

export interface Runner {
  run(): Promise<void>
  init(): Promise<unknown>
  install(): Promise<unknown>
  clean(): Promise<unknown>
}

export class BaseRunner implements Runner {
  readonly targetDir: PresetOptions['targetDir']
  readonly boiPackageDir: PresetOptions['boiPackageDir']
  readonly name: PresetOptions['name']
  readonly version: PresetOptions['version']
  readonly author: PresetOptions['author']

  /**
   * only accessible after BaseRunner::init()
   */
  boiConfig!: VRNBoilerplateConfig

  constructor(protected readonly options: Partial<PresetOptions> = {}) {
    logger.verbose(`${this.className}::constructor options:\n${JSON.stringify(options, null, 2)}`)

    const { targetDir, boiPackageDir, name, version, author } = this.ensureParams()
    this.targetDir = targetDir
    this.boiPackageDir = boiPackageDir
    this.name = name
    this.version = version
    this.author = author
  }

  async run(): Promise<void> {
    logger.verbose(`<${this.className}> startup...`)
    logger.verbose(`${this.className}::init`)
    await this.init()
    logger.verbose(`${this.className}::install`)
    await this.install()
    logger.verbose(`${this.className}::clean`)
    await this.clean()
    logger.verbose(`<${this.className}> finished.`)
  }

  /**
   * calling this method return true, which means the custom script
   * was found and executed successfully, and false, which means it was not.
   */
  async init(): Promise<boolean> {
    this.boiConfig = this.ensureBoiPackage()
    // ensure targetDir exists
    fs.mkdirpSync(this.targetDir)

    if (this.boiConfig.init) {
      const { scriptType, scriptFile } = this.boiConfig.init
      this.execCustomScript(scriptType, scriptFile)
      return true
    }

    // Subclasses should execute their own default logic
    return false
  }

  /**
   * calling this method return true, which means the custom script
   * was found and executed successfully, and false, which means it was not.
   */
  async install(): Promise<boolean> {
    if (this.boiConfig.install) {
      const { scriptType, scriptFile } = this.boiConfig.install
      this.execCustomScript(scriptType, scriptFile)
      return true
    }

    // copy boilerplate files to targetDir...
    const boiDir = path.resolve(this.boiPackageDir, 'boilerplate')
    fs.copySync(boiDir, this.targetDir)

    // git init
    await this.initGitRepo()

    // Subclasses should execute their own default logic
    return false
  }

  /**
   * calling this method return true, which means the custom script
   * was found and executed successfully, and false, which means it was not.
   */
  async clean(): Promise<boolean> {
    if (this.boiConfig.clean) {
      const { scriptType, scriptFile } = this.boiConfig.clean
      this.execCustomScript(scriptType, scriptFile)
      return true
    }

    // Subclasses should execute their own default logic
    return false
  }

  protected get className(): string {
    return Object.getPrototypeOf(this).constructor.name
  }

  private ensureParams(): Pick<
    PresetOptions,
    'targetDir' | 'boiPackageDir' | 'name' | 'version' | 'author'
  > {
    const argv = minimist(process.argv.slice(2))
    // prepare and params validate...
    const {
      targetDir = argv['target-dir'] ?? argv.targetDir ?? process.cwd(),
      boiPackageDir = argv['boi-package-dir'] ?? argv.boiPackageDir,
      name = argv.name,
      version = argv.version,
      author = argv.author,
    } = this.options

    if (!targetDir) throw new Error('targetDir is required')
    if (!boiPackageDir) throw new Error('boiPackageDir is required')
    if (!name) throw new Error('name is required')
    if (!version) throw new Error('version is required')
    if (!author) throw new Error('author is required')

    return { targetDir, boiPackageDir, name, version, author }
  }

  private ensureBoiPackage(): VRNBoilerplateConfig {
    const boiDir = path.resolve(this.boiPackageDir, 'boilerplate')
    if (!fs.pathExistsSync(boiDir))
      throw new Error('invalid boi-package: boilerplate directory is not exists.')

    const boiConfigFile = path.join(this.boiPackageDir, 'vrn-boilerplate.json')
    if (!fs.existsSync(boiConfigFile))
      throw new Error('invalid boi-package: vrn-boilerplate.json is not exists.')
    return fs.readJsonSync(boiConfigFile)
  }

  protected execCustomScript(scriptType: CustomScriptType, scriptFile: string) {
    const absoluteScriptFile = path.join(this.boiPackageDir, scriptFile)
    logger.verbose(`exec custom script: ${absoluteScriptFile}`)
    execa.sync(
      scriptInterpreter[scriptType] ?? scriptInterpreter.sh,
      [absoluteScriptFile, `--name`, this.name, `--version`, this.version, `--author`, this.author],
      {
        stdio: 'inherit',
        // Execute on targetDir, the path can be obtained in the custom script via `pwd`
        cwd: this.targetDir,
      },
    )
  }

  protected async initGitRepo(): Promise<void> {
    const { gitInit = true } = this.options
    if (!gitInit) return

    try {
      if (this.cmdIsExists('git')) {
        logger.startLoading('init git repo...')
        // git init && git add . && git commit -m "chore: init repository"
        await execa('git', ['init'], { cwd: this.targetDir, stdio: 'pipe' })
        await execa('git', ['add', '.'], { cwd: this.targetDir, stdio: 'pipe' })
        await execa('git', ['commit', '-m', 'chore: init repository'], {
          cwd: this.targetDir,
          stdio: 'pipe',
        })
        logger.done('init git repo finished.')
      } else {
        logger.warn('git is not installed, skip init git repo.')
      }
    } catch (error) {
      logger.warn('init git repo failed.')
    } finally {
      logger.stopLoading()
    }
  }

  protected cmdIsExists(cmd: string): boolean {
    try {
      execSync(
        os.platform() === 'win32'
          ? `cmd /c "(help ${cmd} > nul || exit 0) && where ${cmd} > nul 2> nul"`
          : `command -v ${cmd}`,
        { stdio: 'ignore' },
      )
      return true
    } catch {
      return false
    }
  }
}

export const runner: PresetRunner = async (options) => {
  await new BaseRunner(options).run()
}

if (require.main === module) {
  runner({})
}
