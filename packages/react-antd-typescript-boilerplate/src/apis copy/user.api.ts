import { safeFetch } from './base'

export interface UserEntity {
  id: number
  username: string
  nickname: string
  score: number
  role: number
  sn: number
}

export async function getAllUser() {
  const res = await safeFetch<UserEntity[]>({
    url: 'http://127.0.0.1:10000/user/profile/all',
    method: 'GET',
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIsInJvbGUiOjksImlhdCI6MTU2NzU4NTE5OSwiZXhwIjoxNTY3NjcxNTk5fQ.FqqWyIHMC59Hc0M4o4Ghc_wSeK-ULlNaA1zyAHJxMXE',
    },
  })
  return res.result
}
