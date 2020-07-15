/*
 * @Author: Cphayim
 * @Date: 2020-07-12 18:24:02
 * @LastEditTime: 2020-07-15 10:35:41
 * @Description: Redux 类型声明文件，勿修改
 */

import { StateType, ActionType } from 'typesafe-actions';

declare module 'MyTypes' {
  export type Store = StateType<typeof import('./index').default>;
  export type RootAction = ActionType<typeof import('./root-action').default>;
  export type RootState = StateType<ReturnType<typeof import('./root-reducer').default>>;
}

declare module 'typesafe-actions' {
  interface Types {
    RootAction: ActionType<typeof import('./root-action').default>;
  }
}
