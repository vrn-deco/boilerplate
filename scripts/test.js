import YAML from 'yaml'
import { readFileSync } from 'fs'
import { join } from 'path'

const FILE = join(__dirname, 'boilerplate.tpl.yml')

const yamlContent = readFileSync(FILE).toString()

console.log(YAML.parse(yamlContent))
