import path from 'path'
import fs from 'fs-extra'
import { execa } from 'execa'

import { logger } from '@ombro/logger'
import type { PresetOptions, PresetRunner } from '@vrn-deco/boilerplate-protocol'
import { BaseRunner, isMain } from '@vrn-deco/boilerplate-preset-base'

type PMInstallCommand = {
  [P in PresetOptions['packageManager']]: string
}
const installCommand: PMInstallCommand = {
  npm: 'install',
  yarn: 'install', // full amount of installed
  pnpm: 'install',
}

export class NPMRunner extends BaseRunner {
  override async install(): Promise<boolean> {
    // The custom script is invoked and exits
    if (await super.install()) return true

    // update package.json
    this.updatePackageJSON()

    // install dependencies
    const { autoInstallDeps = false } = this.options
    if (autoInstallDeps) {
      await this.installDeps()
    }

    return false
  }

  private updatePackageJSON(): void {
    const { name, version, author } = this
    const pkgFile = path.join(this.targetDir, 'package.json')
    const pkg = fs.readJsonSync(pkgFile)
    fs.writeJsonSync(pkgFile, { ...pkg, name, version, author }, { spaces: 2 })
  }

  private async installDeps(): Promise<void> {
    let packageManager = this.options.packageManager ?? 'npm'
    if (packageManager !== 'npm' && !this.cmdIsExists(packageManager)) {
      logger.warn(`'${packageManager}' is not installed, fallback to 'npm'.`)
      packageManager = 'npm'
    }
    try {
      await execa(packageManager, [installCommand[packageManager]], {
        cwd: this.targetDir,
        stdio: 'inherit',
      })
    } catch (error) {
      logger.warn("Failed to install dependencies. You'll need to install it yourself")
    }
  }
}

export const runner: PresetRunner = async (options) => {
  await new NPMRunner(options).run()
}

// Direct run
if (isMain(import.meta)) {
  runner({})
}
export { isMain }
