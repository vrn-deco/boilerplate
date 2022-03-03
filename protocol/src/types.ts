/*
 * @Author: Cphayim
 * @Date: 2021-07-18 03:09:00
 * @Description: types
 */

// ----------------------------------------------------------------------------

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
  sort?: number
}

// ----------------------------------------------------------------------------

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
  tags?: string[]
  sort?: number
}

export type CustomScript = {
  scriptType: CustomScriptType
  scriptFile: string
}

export type CustomScriptType = 'js' | 'py' | 'sh'

// ----------------------------------------------------------------------------

export type PresetOptions = {
  targetDir: string
  boiPackageDir: string
  name: string
  version: string
  author: string
  packageManager: 'npm' | 'yarn' | 'pnpm'
}

export type PresetRunner = (opts: Partial<PresetOptions>) => Promise<void>
