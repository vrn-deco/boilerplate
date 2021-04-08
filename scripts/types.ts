/*
 * @Author: Cphayim
 * @Date: 2021-04-01 13:16:33
 * @Description: 类型
 */
export type Resource = Lang[]

export interface Lang {
  label: string // 名称
  desc?: string // 描述
  key: string // 资源目录名称
  frameworks: Framework[]
}

export interface Framework {
  label: string // 名称
  desc?: string // 描述
  key: string // 资源目录名称
  boilerplate: Boilerplate[]
}

export interface Boilerplate {
  label: string // 名称
  desc?: string // 描述
  key: string // 资源目录名称
  version: string // 版本号 'a.b.c'
  flag?: string // 特殊标记，例如： typescript、docker
  tags: string[] // 标签
  packageType: PackageType // 包类型
  scriptType?: ScriptType // 脚本类型
  initScript?: string // 初始化脚本文件名
  clearScript?: string // 清理脚本文件名
}

export enum PackageType {
  NPM, // javascript/typescript
  PUB, // flutter
  PIP, // python
  MAVEN, // java
}

// 脚本类型
export enum ScriptType {
  JavaScript,
  Shell,
}
