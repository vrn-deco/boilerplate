# `@vrn-deco/boilerplate-protocol`

[![npm package](https://badgen.net/npm/v/@vrn-deco/boilerplate-protocol)](https://www.npmjs.com/package/@vrn-deco/boilerplate-protocol)

English | [中文](./README_zh.md)

> This package is mainly for type definitions and interface definitions, which are used to standardize related implementation packages.

## Specification

`@vrn-deco/boilerplate-protocol` v1 defines `manifest`, `preset`, `boi-package` related types and function interfaces，see `src/types.ts`

### Manifest

The `Manifest` type is defined and exported in the package

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

`manifest-package` should implement:

- Gather information about `boi-packages` that need to be listed

- Organized into data conforming to the `Manifest` interface

- Provide a way to obtain this data for external service calls

### Presets

The package defines and exports the `PresetRunner` functional interface and the `PresetOptions` type

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

`preset-package` should implement:

- A function `runner` implementing the `PresetRunner` interface

- Parse and validate `PresetOptions`

- read configuration files in `boi-package`

- Implement your own preset processing logic

  - `initHandler`, `installHandler`, `cleanHandler`
  - When a custom script exists in the configuration file of `boi-package`, execute the custom script to override the original process

- `runner` supports API calls and command line calls

### Boilerplate packages

The package defines and exports the `VRNBoilerplateConfig` type, which, like `vrn-boilerplate.schema.json`, is used to describe the field types in the `boi-package` configuration file `vrn-boilerplate.json`

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

`preset-package` should implement:

- Create configuration file `vrn-boilerplate.json` based on `vrn-boilerplate.schema.json`
- Store `boilerplate` related files
- Install your own `boilerplate` using the `preset-package` specified in `vrn-boilerplate.json`
  - Returns a wrapper function `wrapRunner` of `preset-package -> runner`
  - This wrapper function references itself as `boiPackageDir`
- `wrapRunner` supports API calls and command line calls

## Install

```sh
$ npm install @vrn-deco/boilerplate-protocol@^1.0.0
```

Please use the constrained version when installing to avoid breaking changes introduced by subsequent `major` versions

e.g. `^1.0.0` or `~1.0.0`

## Usage

types:

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

verify `vrn-boilerplate.json`:

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
