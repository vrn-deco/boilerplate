import path from 'node:path'
import fs from 'fs-extra'
import { execaCommandSync } from 'execa'
import { prompt } from 'inquirer'
import { logger } from '@ombro/logger'

const $$SCHEMA$$ = 'https://unpkg.com/@vrn-deco/boilerplate-protocol/vrn-boilerplate.schema.json'

const _REPO_ = path.resolve(__dirname, '..', '..')
const _TPL_ = path.join(_REPO_, '.tpl')
const _BOI_PACKAGE_TPL_ = path.join(_TPL_, 'boi-package')

/**
 * interactive create new boilerplate package
 */
export async function createBoilerplatePackage() {
  const { language, folderName, packageName, description, preset } = await prompt([
    {
      name: 'language',
      message: 'What is boilerplate programing language?',
      default: 'a full name with capitalization, e.g. JavaScript',
      validate: (input: string) =>
        (!!input && !/\s/.test(input)) || 'Language name is required, cannot contain spaces',
    },
    {
      name: 'folderName',
      message: 'What is boilerplate folder name?',
      default: 'technology stack used, e.g. vue-element',
      validate: (input: string) =>
        (!!input && !/\s/.test(input)) || 'Folder name is required, cannot contain spaces',
    },
    {
      name: 'packageName',
      message: 'What is boilerplate package name?',
      default: ({ language, folderName }) =>
        `@vrn-deco/boilerplate-${language.toLowerCase()}-${folderName}`,
      validate: (input: string) => !!input || 'Package name is required',
    },
    {
      name: 'description',
      message: 'What is boilerplate package description?',
      default: ({ packageName }) =>
        `${packageName.replace(/^@.*\/(.*)$/, '$1').replaceAll('-', ' ')}`,
    },
    {
      name: 'preset',
      type: 'list',
      message: 'Select a preset as the installer',
      choices: getPresetsChoices(),
    },
  ])

  logger.log('')
  logger.startLoading('Creating boilerplate package')

  const targetDir = path.join(_REPO_, 'packages', language.toLowerCase(), folderName)
  fs.copySync(_BOI_PACKAGE_TPL_, targetDir)

  logger.startLoading('update files...')
  // overwrite package.json fields
  const packageJson = path.join(targetDir, 'package.json')
  const packageJsonData = fs.readJsonSync(packageJson)
  packageJsonData.name = packageName
  packageJsonData.description = description
  packageJsonData.repository.directory = path.posix.join(
    'packages',
    language.toLowerCase(),
    folderName,
  )
  fs.writeJsonSync(packageJson, packageJsonData, { spaces: 2 })

  // create boilerplate directory
  fs.mkdirSync(path.join(targetDir, 'boilerplate'))

  // generate vrn-boilerplate.json
  const json = {
    $schema: $$SCHEMA$$,
    name: folderName
      .split('-')
      .map((word: string) => word[0].toUpperCase() + word.slice(1))
      .join(' '),
    package: packageName,
    language: language,
    techStack: folderName.replaceAll('-', '+'),
    preset: preset,
    tags: [],
    sort: 100,
  }
  fs.writeFileSync(path.join(targetDir, 'vrn-boilerplate.json'), JSON.stringify(json, null, 2))

  logger.info('Generated vrn-boilerplate.json, next you can modify it!')
  logger.log(JSON.stringify(json, null, 2))

  // overwrite package.json and index.js
  fs.writeFileSync(
    path.join(targetDir, 'package.json'),
    fs.readFileSync(path.join(targetDir, 'package.json'), 'utf8').replace(/{{PRESET}}/g, preset),
    'utf8',
  )
  fs.writeFileSync(
    path.join(targetDir, 'index.js'),
    fs.readFileSync(path.join(targetDir, 'index.js'), 'utf8').replace(/{{PRESET}}/g, preset),
    'utf8',
  )

  // overwrite README.md
  const readmeFiles = [path.join(targetDir, 'README.md'), path.join(targetDir, 'README_zh.md')]
  readmeFiles.forEach((readmeFile) => {
    fs.writeFileSync(
      readmeFile,
      fs.readFileSync(readmeFile, 'utf8').replace(/{{PACKAGE_NAME}}/g, packageName),
      'utf8',
    )
  })

  logger.stopLoading()

  // add new boilerplate package to minifest package.json
  execaCommandSync(
    `pnpm add --workspace -D ${packageName}@* --filter @vrn-deco/boilerplate-manifest`,
    { cwd: _REPO_ },
  )

  logger.done(
    `${packageName} created: packages/${path.posix.join(language.toLowerCase(), folderName)}`,
  )
  logger.done('Now you should run `pnpm install` in the root of the monorepo')
  logger.done('Then you can add code to the `boilerplate`')
}

function getAllPresetPackages() {
  const { stdout } = execaCommandSync('pnpm list -r --json --depth -1', { cwd: _REPO_ })
  return JSON.parse(stdout).filter((pkg: { name: string; path: string }) =>
    /\/presets\/.+/.test(pkg.path),
  )
}

function getPresetsChoices() {
  return getAllPresetPackages().map((pkg) => pkg.name)
}
