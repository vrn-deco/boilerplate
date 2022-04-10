import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UserRepository } from '@/database/repositories/user.repository'
import { AuthTokenDTO } from './auth.dto'
import { UserEntity } from '@/database/entities/user.entity'
import { plainToClass } from 'class-transformer'
import { config } from '@/config'
import { JwtPayload } from './jwt.interface'

@Injectable()
export class AuthService {
  constructor(private userRepository: UserRepository, private jwtService: JwtService) {}

  /**
   * 签发 token
   */
  async signToken(user: UserEntity): Promise<AuthTokenDTO> {
    // 更新用户最后登录时间
    user.lastLoginTime = new Date()
    await user.save()
    // 创建载荷
    const payload: JwtPayload = { uid: user.id }
    return plainToClass(AuthTokenDTO, {
      token: this.jwtService.sign(payload),
      expires: this.getExpires(),
    })
  }

  /**
   * 获取过期时间戳
   */
  private getExpires(): number {
    return Math.floor(Date.now() / 1000) + config.app.TOKEN_EXPIRES
  }

  /**
   * 通过载荷中的 uid 获取用户实体
   */
  async validateUser(payload: JwtPayload): Promise<UserEntity> {
    return this.userRepository.findOne(payload.uid)
  }
}
