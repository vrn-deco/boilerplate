/*
 * @Author: Cphayim
 * @Date: 2021-07-18 03:09:00
 * @Description: types
 */

export type Manifest = Lang[]

export type Lang = {
  name: string
  boilerplate: Boilerplate[]
}

export type Boilerplate = {
  name: string
  desc?: string
  package: string
  version: string
  tags?: string[]
}

export type VRNBoilerplateConfig = {
  name: string
  desc?: string
  package: string
  language: string
  techStack: string
  preset: string
  init?: CustomScript
  install?: CustomScript
  clean?: CustomScript
  tag?: string[]
}

export type CustomScript = {
  scriptType: 'js' | 'py' | 'sh'
  scriptFile: string
}
