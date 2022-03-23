import path from 'path'
import fs from 'fs-extra'
import execa from 'execa'

import type { PresetOptions, PresetRunner } from '@vrn-deco/boilerplate-protocol'
import { BaseRunner } from '@vrn-deco/boilerplate-preset-base'

export class {{RUNNER_NAME}} extends BaseRunner {
  override async install(): Promise<boolean> {
    // The custom script is invoked and exits
    if (await super.install()) return true

    return false
  }
}

export const runner: PresetRunner = async (options) => {
  await new {{RUNNER_NAME}}(options).run()
}

// Direct run
if (require.main === module) {
  runner({})
}
