/*
 * @Author: Cphayim
 * @Date: 2020-11-05 13:57:47
 * @Description: 加解密算法
 */
import { createHash, BinaryToTextEncoding } from 'crypto'
import { config } from '@/config'

type HashAlgorithm = 'md5' | 'sha1' | 'sha256' | 'sha512'
type EncryptHashOptions = {
  data: string
  algorithm?: HashAlgorithm
  encoding?: BinaryToTextEncoding
}
type EncryptHashSafeOptions = { secret?: string } & EncryptHashOptions

/**
 * Hash 加密
 */
export function encryptHash({ data, algorithm = 'md5', encoding = 'hex' }: EncryptHashOptions): string {
  return createHash(algorithm).update(data).digest(encoding)
}

/**
 * Hash 加密（加盐）
 */
export function encryptHashSafe({ secret = config.app.SECRET_KEY, ...options }: EncryptHashSafeOptions): string {
  return encryptHash({ ...options, data: secret + options.data })
}
