# VRN BOILERPLATE

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

## Usage

如您需要拉取本仓库中的项目模板创建项目，推荐使用 `@vrn-deco/cli`

```sh
$ npm install -g @vrn-deco/cli

$ vrn create you-project
```

随后根据命令行提示交互式创建，详细使用和参数说明请查看 **[vrn-cli](https://github.com/vrn-deco/vrn-cli)** 仓库

## Development

本仓库的项目模板包需符合 [@vrn-deco/boilerplate-protocol](./protocol) 约定的规范

### 仓库结构

```sh
monorepo
  ├── manifest  # 模板清单
  ├── packages/  # 各种模板包
  ├── presets/   # 各种预设安装脚本
  └── protocol  # 协议
```

### 模板包

目录以 `language/techstack` 进行分层

```sh
packages
  ├── language1/
  │   ├── techstack1/
  │   └── techstack2/
  └── language2/
      ├── techstack1/
      └── techstack2/
```

其中每个 `techstack` 目录为一个独立的 `boilerplate-package`（模板包），例如：

```sh
packages
  ├── javascript/
  │   ├── vue-element/
  │   └── vue-vant/
  └── typescript/
      ├── vue3-vant/
      └── nest-typeorm/
```

每个 `boilerplate-package` 都是一个独立的 npm 包，以 `@vrn-deco/boilerplate-${language}-${techstack}` 命名

#### 模板包结构

```
boilerplate-package
├── boilerplate/
├── vrn-boilerplate.json
├── index.js
├── init.(js|sh|py)
├── install.(js|sh|py)
└── clean.(js|sh|py)
```

- `boilerplate` 目录
  - 存放真正的项目模板的目录，例如：一个 vue 项目空模板
  - 用户在安装模板的过程中将 `boilerplate` 中的文件全量拷贝到用户创建的目录中
- `vrn-boilerplate.json` 文件
  - 模板配置文件
  - Schema `@vrn-deco/boilerplate-protocol -> vrn-boilerplate.schema.json`
- `index.js`
  - `package.json -> main` 对应的脚本，建议直接抛出一个异常，因为该包仅能通过 vrn-cli 使用
- `init.(js|sh|py)` 可选文件
  - `@vrn-deco/cli` 在 `create` 的 `initHook` 中执行的脚本文件
- `install.(js|sh|py)` 可选文件
  - `@vrn-deco/cli` 在 `create` 的 `installHook` 中执行的脚本文件
- `clean.(js|sh|py)` 可选文件
  - `@vrn-deco/cli` 在 `create` 的 `cleanHook` 中执行的脚本文件

#### 模板配置文件

模板包根目录下必须存在且符合 `@vrn-deco/boilerplate-protocol -> vrn-boilerplate.schema.json` 结构的配置文件 `vrn-boilerplate.json`

字段如下:

- `name`: `string` 模板名
- `package`: `string` npm 包名
- `language`: `string` 编程语言
- `techStack`: `string` 技术栈
- `preset`: `string` 可选，预设脚本包
  - 包含初始化、安装、清理阶段任务的预设脚本包，默认值：
    - 当 `language` 是 `javascript|typescript` 时为 `@vrn-deco/preset-boilerplate-npm`
    - 当 `language` 是 `python` 时为 `@vrn-deco/preset-boilerplate-pip`
    - 当 `language` 是 `dart` 时为 `@vrn-deco/preset-boilerplate-pub`
- `init`: `object` 可选，自定义初始化器
  - 该字段存在时，将使用自定义脚本替换 `preset` 中的 `initHandler`
  - `scriptType`: `js|py|sh` 脚本类型
  - `scriptFile`: `string` 脚本文件
- `install`: `object` 可选，自定义安装器
  - 该字段存在时，将使用自定义脚本替换 `preset` 中的 `installHandler`
  - `scriptType`: `js|py|sh` 脚本类型
  - `scriptFile`: `string` 脚本文件
- `clean`: `object` 可选，自定义清理器
  - 该字段存在时，将使用自定义脚本替换 `preset` 中的 `cleanHandler`
  - `scriptType`: `js|py|sh` 脚本类型
  - `scriptFile`: `string` 脚本文件

## License

[MIT](./LICENSE)
