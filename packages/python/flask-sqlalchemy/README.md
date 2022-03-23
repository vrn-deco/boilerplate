# `@vrn-deco/boilerplate-python-flask-sqlalchemy`

[![npm package](https://badgen.net/npm/v/@vrn-deco/boilerplate-python-flask-sqlalchemy)](https://www.npmjs.com/package/@vrn-deco/boilerplate-python-flask-sqlalchemy)

English | [中文](./README_zh.md)

TODO: 包描述

## How do create a project from this boilerplate?

#### Option I

Interactive creation using `@vrn-deco/cli` is highly recommended, see [vrn-cli repository](https://github.com/vrn-deco/cli/)

#### Option II

Use the installer that comes with this package to create

```sh
npx @vrn-deco/boilerplate-python-flask-sqlalchemy \
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

## Documents
