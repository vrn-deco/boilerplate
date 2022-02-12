# `@vrn-deco/boilerplate-preset-npm`

[![npm package](https://badgen.net/npm/v/@vrn-deco/boilerplate-preset-npm)](https://www.npmjs.com/package/@vrn-deco/boilerplate-preset-npm)

English | [中文](./README_zh.md)

This package is an implementation of `@vrn-deco/boilerplate-protocol` v1 `PresetRunner` to automate the installation of `boilerplate` managed by `npm`

## How to use?

Support both command line and API calls

```
                                       +-----------------+     +-------------------+
                                       |                 | --> |     API call      |
                                       |                 |     +-------------------+
+--------------------------------+     |                 |
| @vrn-deco/boilerplate-protocol | --> | preset-packages |
+--------------------------------+     |                 |
                                       |                 |     +-------------------+
                                       |                 | --> | command line call |
                                       +-----------------+     +-------------------+
```

### Command line call

```sh
npx @vrn-deco/boilerplate-preset-npm \
	--target-dir="$(pwd)/my-app" \
	--boi-package-dir="/xxx/boi-package" \
	--name="my-app" \
	--version="0.0.1" \
	--author="cphayim"
```

Parameters:

- `--target-dir`: The target directory, that is, where it needs to be installed, it can point to a non-existing directory, it will automatically execute `mkdir -p`
- `--boi-package-dir`: local path to `boi-package`
- `--name`: project name, `PresetRunner` will modify the corresponding project file field according to the type of `boilerplate`, and ensure it is valid by itself
- `--version`: the project version, `PresetRunner` will modify the corresponding project file fields according to the type of `boilerplate` to ensure the validity by itself
- `--author`: the author of the project, `PresetRunner` will modify the corresponding project file fields according to the type of `boilerplate` to ensure the validity by itself

Add the environment variable `LOGGER_LEVEL=verbose` to output debug logs:

```sh
export LOGGER_LEVEL=verbose; \
npx @vrn-deco/boilerplate-preset-npm \
	--target-dir="$(pwd)/my-app" \
	--boi-package-dir="/xxx/boi-package" \
	--name="my-app" \
	--version="0.0.1" \
	--author="cphayim"
```

### API call

```ts
type PresetRunner = (opts: Partial<PresetOptions>) => Promise<void>
```

`PresetOptions`：

- `targetDir`: The target directory, that is, where it needs to be installed, it can point to a non-existing directory, and it will automatically execute `mkdir -p`
- `boiPackageDir`: local path to `boi-package`
- `name`: the project name, `PresetRunner` will modify the corresponding project file field according to the type of `boilerplate` to ensure it is valid
- `version`: the project version, `PresetRunner` will modify the corresponding project file fields according to the type of `boilerplate` to ensure it is valid
- `author`: the author of the project, `PresetRunner` will modify the corresponding project file fields according to the type of `boilerplate` to ensure the validity by itself

Example:

```ts
import { runner } from '@vrn-deco/boilerplate-preset-npm'

try {
  await runner({
    targetDir: path.resolve(process.cwd(), 'my-app'),
    boiPackageDir: path.resolve('/xxx', 'boi-package'),
    name: 'my-app',
    version: '0.0.1',
    auhtor: 'Cphayim',
  })
} catch (err) {
  console.error(err)
}
```
