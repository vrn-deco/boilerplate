# `@vrn-deco/boilerplate-preset-pip`

[![npm package](https://badgen.net/npm/v/@vrn-deco/boilerplate-preset-pip)](https://www.npmjs.com/package/@vrn-deco/boilerplate-preset-pip)

[English](./README.md) | 中文

该包是对 `@vrn-deco/boilerplate-protocol` v1 `PresetRunner` 的实现，用于自动化安装 `pip` 管理的 `boilerplate`

## 如何使用？

支持命令行和 API 调用两种方式使用

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

### 命令行调用

```sh
npx @vrn-deco/boilerplate-preset-pip \
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

添加环境变量 `LOGGER_LEVEL=verbose` 可以输出调试日志：

```sh
export LOGGER_LEVEL=verbose; \
npx @vrn-deco/boilerplate-preset-pip \
	--target-dir="$(pwd)/my-app" \
	--boi-package-dir="/xxx/boi-package" \
	--name="my-app" \
	--version="0.0.1" \
	--author="cphayim"
```

### API 调用

```ts
type PresetRunner = (opts: Partial<PresetOptions>) => Promise<void>
```

`PresetOptions`：

- `targetDir`: 目标目录，即需要安装到哪里，可以指向一个不存在的目录，会自动执行 `mkdir -p`
- `boiPackageDir`: 提供安装所需 `boielrplate` 的 `boi-pakcgae` 的本地路径
- `name`: 项目名称，`PresetRunner` 会根据 `boilerplate` 的种类修改对应的工程文件字段，自行确保有效
- `version`: 项目版本，`PresetRunner` 会根据 `boilerplate` 的种类修改对应的工程文件字段，自行确保有效
- `author`: 项目作者，`PresetRunner` 会根据 `boilerplate` 的种类修改对应的工程文件字段，自行确保有效

示例：

```ts
import { runner } from '@vrn-deco/boilerplate-preset-pip'

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
