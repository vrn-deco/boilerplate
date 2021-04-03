# 环境变量文件使用说明

## 1 安装解析和注入包

> 所有根目录下存在 `env` 目录的项目模板中已集成解析注入包，并且配置完毕，可以**跳过该步骤**

安装解析注入包

```sh
$ npm i -D @naughty/vue-env-loader
```

在 `vue.config.js` 中配置解析注入包

```js
const { resolve } = require('path')
const { VueEnvLoader } = require('@naughty/vue-env-loader')

const config = new VueEnvLoader({
  // env 目录绝对路径
  envPath: resolve(__dirname, 'env'),
  // 自定义通过命令行参数注入单个环境变量所用的变量名
  customName: 'custom-env',
}).inject({
  // ...其它 vue-cli config 配置
})

module.exports = config
```

* `envPath`: 环境变量文件所在目录的绝对路径
* `customName`: [可选参数] 将从命令行接收此字段指定的一个参数，直接注入到程序中


在 npm script 命令中加入 `--env-mode` 来指定模式，将对应的模式的环境变量文件中的环境变量注入到程序中，假设我们有 `env/.env.xxx` 这个环境变量文件：

```
AUTHOR=Cphayim
```

我们使用如下 npm script 启动程序

```sh
vue-cli-service serve --open --env-mode=xxx --custom-env='我是自定义参数值'
```

前端代码可以直接访问

```js
console.log(process.env.AUTHOR) // 'Cphayim'
console.log(process.env['custom-env']) // '我是自定义参数值'
```

## 2 模式

环境变量文件由 `.env` 前缀的文件组成，格式为

```
.env
.env.local
.env.mode
.env.mode.local
```

带 `.local` 后缀的环境变量文件表示本地环境变量，将**不会**被提交到代码库中

模式通过命令行参数 `--env-mode=modeName` 来指定模式

`.env` 和 `.env.local` 文件在任意模式下都会被加载

优先级：`.env` < `.env.local` < `.env.mode` < `.env.mode.local`

遇到同名变量优先级高的覆盖优先级低的


## 3 书写规则

所有 `.env` 文件中的环境变量都由 `键=值` 组成，`=` 左右不带空格

```
APP_NAME=翻车系统
APP_BASE_URL=http://xxx
feature_enable=false
```

需要注意的是，这里编写所有值在注入后的类型都是 `string`，上面的 `feature_enable` 参数在程序中通过 `process.env.feature` 获取到的是字符串 `'false'`，请自行在程序中通过代码转换类型。

另外，尽量不要所以定义 `NODE_ENV` 同名的环境变量，否则可能导致其它依赖的第三方功能异常。
