export enum Gender {
  Unknown = 0,
  Male = 1,
  Female = 2,
}

export interface UserInfo {
  username: string
  nickname: string
  avatar: string
  gender: Gender
}
