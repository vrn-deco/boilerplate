/*
 * @Author: Cphayim
 * @Date: 2021-07-17 13:40:26
 * @Description: 生成 vrn-manifest.json
 */
import path from 'path'
import childProcess from 'child_process'
import fs from 'fs-extra'
import { logger } from '@ombro/logger'
import {
  Boilerplate,
  Lang,
  Manifest,
  VRNBoilerplateConfig,
  verifyVRNBoilerplateConfig,
} from '@vrn-deco/protocol-boilerplate'

interface ScanPackage {
  name: string
  version: string
  private: boolean
  location: string
}

if (require.main !== module) {
  throw new Error('The module can only be used as a startup module.')
}

const PKG_DIR = path.resolve(__dirname, '..')
const REPO_DIR = getRepoDir()

logger.info('find boilerplate packages...')
childProcess.exec('lerna list --json', { cwd: REPO_DIR }, (err, stdout) => {
  if (err) throw err
  try {
    const pkgs = exclude(JSON.parse(stdout) as ScanPackage[])
    logger.info('disposal data and archive...')
    const manifest = archivePkg(pkgs)
    logger.info('write vrn-manifest.json...')
    writeManifest(manifest)
    logger.done('finished!')
  } catch (error) {
    logger.error(error.stack)
    process.exit(1)
  }
})

function getRepoDir(): string {
  const repoDir = path.resolve(__dirname, '..', '..', '..')
  const repoPkgPath = path.join(repoDir, 'package.json')
  const isValid =
    fs.existsSync(repoPkgPath) && fs.readJSONSync(repoPkgPath).name === 'vrn-boilerplate'
  if (!isValid) throw new Error('generator must run in the monorepo')
  return repoDir
}

const EXCLUDES = /packages\/.*$/

function exclude(pkgs: ScanPackage[]): ScanPackage[] {
  return pkgs.filter((pkg) => !EXCLUDES.test(pkg.location))
}

type PKG = { name: string; version: string }

function archivePkg(pkgs: ScanPackage[]): Manifest {
  const langMap: Record<Lang['name'], Boilerplate[]> = {}

  pkgs.forEach(({ location }) => {
    if (!fs.pathExistsSync(location)) throw new Error(`${location} not exists`)

    const pkgPath = path.join(location, 'package.json')
    const configPath = path.join(location, 'vrn-boilerplate.json')
    if (!fs.existsSync(pkgPath)) throw new Error(`${pkgPath} not exists`)
    if (!fs.existsSync(configPath)) throw new Error(`${configPath} not exists`)

    const pkg = fs.readJsonSync(pkgPath) as PKG
    const config = fs.readJSONSync(configPath) as VRNBoilerplateConfig

    verifyVRNBoilerplateConfig(config, configPath)

    const boilerplate: Boilerplate = {
      name: config.name,
      desc: config.desc ?? '',
      package: pkg.name,
      version: pkg.version,
      tags: config.tag ?? [],
    }
    if (langMap[config.language]) {
      langMap[config.language]!.push(boilerplate)
    } else {
      langMap[config.language] = [boilerplate]
    }
  })

  const manifest: Manifest = Object.entries(langMap).map(([name, boilerplate]) => {
    boilerplate.sort((a, b) => (a.name > b.name ? 1 : -1))
    return {
      name,
      boilerplate,
    }
  })

  return manifest
}

function writeManifest(manifest: Manifest): void {
  fs.writeJSONSync(path.join(PKG_DIR, 'vrn-manifest.json'), manifest, { spaces: 2 })
}
