/*
 * @Author: Cphayim
 * @Date: 2021-07-18 03:11:32
 * @Description: validator
 */
import { fileURLToPath } from 'node:url'
import path from 'node:path'

import fs from 'fs-extra'
import Ajv from 'ajv'

import type { VRNBoilerplateConfig } from './types'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const boilerplateSchema = fs.readJSONSync(
  path.resolve(__dirname, '..', 'vrn-boilerplate.schema.json'),
)

export function verifyVRNBoilerplateConfig(config: VRNBoilerplateConfig, path: string): boolean {
  const ajv = new Ajv()
  const validate = ajv.compile(boilerplateSchema)
  const valid = validate(config)
  if (!valid) {
    throw new Error(
      `${path} is invalid vrn-boilerplate.json\n${JSON.stringify(validate.errors, null, 2)}`,
    )
  }
  return valid as boolean
}
