import path from 'path'
import fs from 'fs-extra'
import execa from 'execa'
import { Manifest, APIManifest, APIBoilerplate, Lang } from '@vrn-deco/boilerplate-protocol'
import { getAllBoilerplatePackage, ScanPackage } from './utils'
import { logger } from '@ombro/logger'

const RELEASE_DIR = path.join(__dirname, '..', 'release')
const IGNORE_LIST = [
  // mac
  // '.DS_Store',
  // ide
  '.idea',
  '.vscode',
  /**
   *
   */
  // js & ts
  'node_modules',
  'dist',
  'build',

  // flutter
  '.dart_tool',
  '.flutter-plugins',
  '.flutter-plugins-dependencies',
  '.packages',
  '.pub-cache/',
  '.pub/',
]

export function httpBoilerplateArchive(manifest: Manifest): APIManifest {
  fs.removeSync(RELEASE_DIR)
  fs.mkdirpSync(RELEASE_DIR)
  const pkgs = getAllBoilerplatePackage()
  const apiManifest: APIManifest = manifest.map((lang) => {
    return {
      ...lang,
      boilerplate: lang.boilerplate.map((boilerplate) => {
        const file = transformBoilerplateTGZ(boilerplate.package, pkgs)
        return {
          name: boilerplate.name,
          desc: boilerplate.desc,
          version: boilerplate.version,
          tags: boilerplate.tags,
          file,
          recommended: boilerplate.recommended,
          deprecated: boilerplate.deprecated,
        }
      }),
    } as Lang<APIBoilerplate>
  })
  fs.writeJsonSync(path.join(RELEASE_DIR, 'manifest.json'), apiManifest)
  logger.done('Generated HTTP release manifest.json, all boilerplate are packed into tgz file')
  return apiManifest
}

function transformBoilerplateTGZ(packageName: string, pkgs: ScanPackage[]): string {
  const location = pkgs.find((pkg) => pkg.name === packageName)!.path
  const match = packageName.match(/^@vrn-deco\/(?<file>.+)/)
  if (!match) throw new Error(`${packageName} is not a valid boilerplate`)
  const file = `${match.groups!.file}.tgz`
  const output = path.join(RELEASE_DIR, file)
  const ignoreArgs = IGNORE_LIST.map((i) => `--exclude ${i}`).join(' ')
  execa.commandSync(`tar ${ignoreArgs} -cvzPhf ${output} boilerplate`, {
    stdio: 'ignore',
    cwd: location,
  })
  return file
}
