import { createBoilerplatePackage } from './boilerplate'
import { createPresetPackage } from './preset'

if (require.main === module) {
  process.argv.includes('--preset') && createPresetPackage()
  if (process.argv.includes('--boilerplate') || process.argv.includes('--boi')) {
    createBoilerplatePackage()
  }
}
