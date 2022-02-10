# `@vrn-deco/boilerplate-protocol`

[![npm package](https://badgen.net/npm/v/@vrn-deco/boilerplate-protocol)](https://www.npmjs.com/package/@vrn-deco/boilerplate-protocol)

[English](./README.md) | 中文

> 该包主要为类型定义和接口定义，用于规范相关的实现包

## 规范

`@vrn-deco/boilerplate-protocol` v1 版本定义了 `manifest`、`preset`、`boi-package` 相关的类型和函数接口，查看 `src/types.ts`

### Manifest

包中定义并导出了 `Manifest` 类型

```
+--------------------------------+
| @vrn-deco/boilerplate-protocol |
+--------------------------------+
                |
                v
+--------------------------------+     +-------------------+
|        manifest package        | --> | external services |
+--------------------------------+     +-------------------+
                ^
                |
+--------------------------------+
|        boi-packages...         |
+--------------------------------+
```

`manifest-package` 应实现：

- 收集需要列出的 `boi-packages` 的信息
- 整理为符合 `Manifest` 接口的数据
- 提供获取这份数据的方式，以便外部服务调用

### Preset

包中定义并导出了 `PresetRunner` 函数接口和 `PresetOptions` 类型

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

`preset-package` 应实现：

- 实现 PresetRunner 接口的函数 `runner`
- 解析并验证 `PresetOptions`
- 读取 `boi-package` 中的配置文件
- 实现自己的预置处理逻辑
  - `initHandler`、`installHandler`、`cleanHandler`
  - 当配置文件中存在自定义脚本时执行自定义脚本覆盖原本的流程
- `runner`支持 API 调用和命令行调用两种方式

### Boilerplate package

包中定义并导出了 `VRNBoilerplateConfig` 类型，它与 `vrn-boilerplate.schema.json` 一样都是用来描述 `boi-package` 的配置文件 `vrn-boilerplate.json` 中的字段类型

```
+--------------------------------+     +-----------------+
| @vrn-deco/boilerplate-protocol |     | preset-packages |
+--------------------------------+     +-----------------+
  |                                      |
  |                                      |
  v                                      v
+--------------------------------+     +-----------------+     +-------------------+
|      vrn-boilerplate.json      | --> |                 | --> |     API call      |
+--------------------------------+     |  boi-packages   |     +-------------------+
                                       |                 |     +-------------------+
                                       |                 | --> | command line call |
                                       +-----------------+     +-------------------+
```

`preset-package` 应实现：

- 根据 `vrn-boilerplate.schema.json` 创建配置文件 `vrn-boilerplate.json`

- 存放 `boilerplate` 相关文件

- 使用 `vrn-boilerplate.json` 所指定的 `preset-package`来安装自己的 `boilerplate`

  - 返回一个 `preset-package -> runner` 的包装函数 `wrapRunner`
  - 这个包装函数引用了自身作为 `boiPackageDir`

- `wrapRunner`支持 API 调用和命令行调用两种方式

## 安装

```sh
$ npm install @vrn-deco/boilerplate-protocol@^1.0.0
```

请在安装时使用约束版本，避免后续的 `major` 版本引入破坏性变更

例如 `^1.0.0` 或 `~1.0.0`

## 使用

类型

```typescript
import type {
  Manifest,
  Lang,
  Boilerplate,
  VRNBoilerplateConfig,
  CustomScript,
  CustomScriptType,
  PresetRunner,
  PresetOptions,
} from '@vrn-deco/boilerplate-protocol'
```

验证 `vrn-boilerplate.json`

```typescript
import fs from 'fs'
import path from 'path'
import { verifyVRNBoilerplateConfig } from '@vrn-deco/boilerplate-protocol'

const boiConfig = path.resolve('xxx', 'vrn-boilerplate.json')
const isValid = verifyVRNBoilerplateConfig(
  JSON.parse(fs.readFileSync(boiConfig, { encoding: 'utf-8' })),
  boiConfig,
)
```
