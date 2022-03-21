const micromatch = require('micromatch')

module.exports = {
  '*.{js,json}': (files) => {
    const match = micromatch.not(files, ['**/boilerplate/**'], { dot: true })
    return !match.length ? [] : [`prettier --write ${match.join(' ')}`]
  },
  '*.ts': (files) => {
    const match = micromatch.not(files, ['**/boilerplate/**'], { dot: true })
    return !match.length
      ? []
      : [`eslint ${match.join(' ')}`, `prettier --write --parser typescript ${match.join(' ')}`]
  },
}
