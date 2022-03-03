import path from 'node:path'
import fs from 'fs-extra'
import { prompt } from 'inquirer'
import { logger } from '@ombro/logger'

const _REPO_ = path.resolve(__dirname, '..', '..')
const _TPL_ = path.join(_REPO_, '.tpl')
const _PRESET_PACKAGE_TPL_ = path.join(_TPL_, 'preset-package')

/**
 * interactive create new preset package
 */
export async function createPresetPackage() {
  const { folderName, packageName, description } = await prompt([
    {
      name: 'folderName',
      message: 'What is preset folder name?',
      validate: (input: string) => !!input || 'Folder name is required',
    },
    {
      name: 'packageName',
      message: 'What is preset package name?',
      default: ({ folderName }) => `@vrn-deco/boilerplate-preset-${folderName}`,
      validate: (input: string) => !!input || 'Package name is required',
    },
    {
      name: 'description',
      message: 'What is preset package description?',
      default: ({ folderName }) => `boilerplate preset ${folderName} package installer`,
    },
  ])
  logger.log('')

  const targetDir = path.join(_REPO_, 'presets', folderName)
  fs.copySync(_PRESET_PACKAGE_TPL_, targetDir)

  // overwrite package.json fields
  const packageJson = path.join(targetDir, 'package.json')
  const packageJsonData = fs.readJsonSync(packageJson)
  packageJsonData.name = packageName
  packageJsonData.description = description
  packageJsonData.repository.directory = `presets/${folderName}`
  fs.writeJsonSync(packageJson, packageJsonData, { spaces: 2 })

  // overwrite src/index.ts {{RUNNER_NAME}}
  const runnerName = `${folderName.toUpperCase()}PresetRunner`
  const runnerFile = path.join(targetDir, 'src', 'index.ts')
  fs.writeFileSync(
    runnerFile,
    fs.readFileSync(runnerFile, 'utf8').replace(/{{RUNNER_NAME}}/g, runnerName),
    'utf8',
  )

  // overwrite README.md
  const readmeFiles = [path.join(targetDir, 'README.md'), path.join(targetDir, 'README_zh.md')]
  readmeFiles.forEach((readmeFile) => {
    fs.writeFileSync(
      readmeFile,
      fs
        .readFileSync(readmeFile, 'utf8')
        .replace(/{{PACKAGE_NAME}}/g, packageName)
        .replace(/{{FOLDER_NAME}}/g, folderName),
      'utf8',
    )
  })

  logger.done(`${packageName} created: presets/${folderName}`)
}
