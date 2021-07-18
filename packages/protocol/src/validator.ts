/*
 * @Author: Cphayim
 * @Date: 2021-07-18 03:11:32
 * @Description: 验证器
 */
import path from 'path'
import fs from 'fs-extra'
import Ajv from 'ajv'

import { VRNBoilerplateConfig } from './type'

const boilerplateSchama = fs.readJSONSync(
  path.resolve(__dirname, '..', 'vrn-boilerplate.schema.json'),
)

export function verifyVRNBoilerplateConfig(config: VRNBoilerplateConfig, path: string): boolean {
  const ajv = new Ajv()
  const validate = ajv.compile(boilerplateSchama)
  const valid = validate(config)
  if (!valid) {
    throw new Error(
      `${path} is invalid vrn-boilerplate.json\n${JSON.stringify(validate.errors, null, 2)}`,
    )
  }
  return valid as boolean
}
