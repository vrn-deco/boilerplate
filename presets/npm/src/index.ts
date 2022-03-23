import path from 'path'
import fs from 'fs-extra'
import execa from 'execa'

import type { PresetOptions, PresetRunner } from '@vrn-deco/boilerplate-protocol'
import { BaseRunner } from '@vrn-deco/boilerplate-preset-base'

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

  private updatePackageJSON() {
    const { name, version, author } = this
    const pkgFile = path.join(this.targetDir, 'package.json')
    const pkg = fs.readJsonSync(pkgFile)
    fs.writeJsonSync(pkgFile, { ...pkg, name, version, author }, { spaces: 2 })
  }

  private async installDeps(): Promise<void> {
    const { targetDir, packageManager = 'npm' } = this.options
    await execa(packageManager, [installCommand[packageManager]], {
      cwd: targetDir,
      stdio: 'inherit',
    })
  }
}

export const runner: PresetRunner = async (options) => {
  await new NPMRunner(options).run()
}

// Direct run
if (require.main === module) {
  runner({})
}
