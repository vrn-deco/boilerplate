import { execa } from 'execa'

import { logger } from '@ombro/logger'
import type { PresetRunner } from '@vrn-deco/boilerplate-protocol'
import { BaseRunner, isMain } from '@vrn-deco/boilerplate-preset-base'

export class PIPRunner extends BaseRunner {
  override async install(): Promise<boolean> {
    // The custom script is invoked and exits
    if (await super.install()) return true

    // install dependencies
    const { autoInstallDeps = false } = this.options
    if (autoInstallDeps) {
      await this.installDeps()
    }

    return false
  }

  async installDeps(): Promise<void> {
    if (!this.cmdIsExists('pipenv')) {
      logger.warn('pipenv is not installed. Skipping installing dependencies.')
      return
    }
    try {
      await execa('pipenv', ['install'], { cwd: this.targetDir, stdio: 'inherit' })
    } catch (err) {
      logger.warn("Failed to install dependencies. You'll need to install it yourself")
    }
  }
}

export const runner: PresetRunner = async (options) => {
  await new PIPRunner(options).run()
}

// Direct run
if (isMain(import.meta)) {
  runner({})
}
export { isMain }
