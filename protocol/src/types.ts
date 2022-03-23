/*
 * @Author: Cphayim
 * @Date: 2021-07-18 03:09:00
 * @Description: types
 */

// ----------------------------------------------------------------------------

// Package manifest
export type Manifest = Lang<Boilerplate>[]

export type Lang<T = Boilerplate> = {
  name: string
  boilerplate: T[]
}

export type Boilerplate = {
  name: string
  desc?: string
  package: string
  version: string
  tags?: string[]
  sort?: number
}

// HTTP API manifest
export type APIManifest = Lang<APIBoilerplate>[]

export type APIBoilerplate = Omit<Boilerplate, 'package' | 'sort'> & {
  file: string
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
  autoInstallDeps: boolean
}

export type PresetRunner = (opts: Partial<PresetOptions>) => Promise<void>
