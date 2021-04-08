/*
 * @Author: Cphayim
 * @Date: 2021-04-01 13:30:34
 * @Description: 资源配置
 */
import { PackageType, Resource } from './types'

export const resource: Resource = [
  {
    label: 'JavaScript & TypeScript',
    key: 'javascript',
    frameworks: [
      {
        label: 'Vue',
        key: 'vue',
        boilerplate: [
          {
            label: 'ElementUI',
            key: 'vue-elementui-boilerplate',
            version: '2.1.0',
            tags: ['PC Web'],
            packageType: PackageType.NPM,
          },
          {
            label: 'AntDesign',
            key: 'vue-antd-boilerplate',
            version: '1.0.0',
            tags: ['PC Web'],
            packageType: PackageType.NPM,
          },
          {
            label: 'VantUI',
            key: 'vue-vantui-boilerplate',
            version: '2.2.10',
            tags: ['Mobile Web'],
            packageType: PackageType.NPM,
          },
          {
            label: 'VantUI + H5Plus',
            key: 'vue-vantui-h5plus-boilerplate',
            version: '2.2.10',
            tags: ['Mobile HybridApp'],
            packageType: PackageType.NPM,
          },
        ],
      },
      {
        label: 'React',
        key: 'react',
        boilerplate: [
          {
            label: 'Redux + AntDesign',
            key: 'react-redux-antd-boilerplate',
            version: '0.0.1',
            tags: ['PC Web'],
            packageType: PackageType.NPM,
          },
          {
            label: 'Redux + AntDesign',
            key: 'react-redux-antd-typescript-boilerplate',
            version: '0.0.1',
            flag: '<typescript>',
            tags: ['PC Web'],
            packageType: PackageType.NPM,
          },
        ],
      },
      {
        label: 'Express',
        key: 'express',
        boilerplate: [
          {
            label: 'Express',
            key: 'server-express-boilerplate',
            version: '0.0.1',
            tags: ['REST API', 'Server Render'],
            packageType: PackageType.NPM,
          },
          {
            label: 'Express + Mock.js',
            key: 'server-express-mock-boilerplate',
            version: '0.0.1',
            tags: ['REST API', 'Mock.js Server'],
            packageType: PackageType.NPM,
          },
        ],
      },
      {
        label: 'Nest',
        key: 'nest',
        boilerplate: [
          {
            label: 'Nest + TypeORM',
            key: 'server-nest-boilerplate',
            version: '0.0.1',
            flag: '<docker / typescript>',
            tags: ['REST API', 'GraphyQL', 'MicroService'],
            packageType: PackageType.NPM,
          },
        ],
      },
    ],
  },
  {
    label: 'Dart',
    key: 'dart',
    frameworks: [],
  },
  {
    label: 'Python',
    key: 'python',
    frameworks: [],
  },
]
