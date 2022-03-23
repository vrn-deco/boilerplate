# `@vrn-deco/boilerplate-python-flask-sqlalchemy`

[![npm package](https://badgen.net/npm/v/@vrn-deco/boilerplate-python-flask-sqlalchemy)](https://www.npmjs.com/package/@vrn-deco/boilerplate-python-flask-sqlalchemy)

[English](./README.md) | 中文

TODO: 包描述

## 如何通过此模板创建项目？

#### 方案一

强烈推荐使用 `@vrn-deco/cli` 进行交互式创建，请查阅 [vrn-cli 仓库](https://github.com/vrn-deco/cli/)

#### 方案二

使用本包自带的安装程序进行创建

```sh
npx @vrn-deco/boilerplate-python-flask-sqlalchemy \
	--target-dir="$(pwd)/my-app" \
	--boi-package-dir="/xxx/boi-package" \
	--name="my-app" \
	--version="0.0.1" \
	--author="cphayim"
```

参数说明：

- `--target-dir`: 目标目录，即需要安装到哪里，可以指向一个不存在的目录，会自动执行 `mkdir -p`
- `--boi-package-dir`: 提供安装所需 `boielrplate` 的 `boi-pakcgae` 的本地路径
- `--name`: 项目名称，`PresetRunner` 会根据 `boilerplate` 的种类修改对应的工程文件字段，自行确保有效
- `--version`: 项目版本，`PresetRunner` 会根据 `boilerplate` 的种类修改对应的工程文件字段，自行确保有效
- `--author`: 项目作者，`PresetRunner` 会根据 `boilerplate` 的种类修改对应的工程文件字段，自行确保有效

## 文档
