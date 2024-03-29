/*
 * @Author: Cphayim
 * @Date: 2021-07-19 01:01:04
 * @Description:
 */
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import fs from 'fs-extra'

import type { Manifest } from '@vrn-deco/boilerplate-protocol'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const MANIFEST_FILE = path.resolve(__dirname, '..', 'vrn-manifest.json')

export function getManifest(): Manifest {
  if (!fs.existsSync(MANIFEST_FILE)) {
    throw new Error('vrn-manifest.json not exists')
  }
  return fs.readJSONSync(MANIFEST_FILE)
}
