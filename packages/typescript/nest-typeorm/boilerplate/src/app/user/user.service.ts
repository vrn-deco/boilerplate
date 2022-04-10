import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common'

import { UserEntity, UserRole } from '@/database/entities/user.entity'
import { UserRepository } from '@/database/repositories/user.repository'
import { ListQueryConditionDTO, ListQueryResultDTO } from '@/libs/dto'
import { Like } from 'typeorm'
import { plainToClass } from 'class-transformer'
import { UserLoginDTO, UserRegisterDTO } from './user.dto'

@Injectable()
export class UserService {
  WX_DEV_CODE = 'dev'

  constructor(private readonly userRepository: UserRepository) {}

  /**
   * 通过账号（用户名、密码）验证用户
   * 存在时返回用户实体
   */
  async verifyByAccount(dto: UserLoginDTO) {
    const { username, password } = dto
    const user = await this.userRepository.findOne({ where: { username, password } })
    if (!user) {
      throw new BadRequestException('用户名或密码错误')
    }
    if (user.role === UserRole.Prisoner) {
      throw new ForbiddenException('你的账号被关进小黑屋了，暂时无法访问，快拿起砖头去找"管理员"吧')
    }
    return user
  }

  /**
   * 通过账号（用户名、密码）创建用户
   * 1. 检查用户名是否重复
   */
  async createUserByAccount(dto: UserRegisterDTO) {
    const isExist = await this.userRepository.findOne({ where: { username: dto.username } })
    if (isExist) {
      throw new BadRequestException(`用户名 \`${dto.username}\` 已经存在`)
    }
    const user = this.userRepository.create({ ...dto })
    return user.save()
  }

  /**
   * 删除指定的用户（软删除）
   */
  async deleteUser(id: number) {
    const user = await this.userRepository.findOneOr404(id)
    await user.softRemove()
    return true
  }

  /**
   * 修改用户角色
   */
  async updateRole(id: number, role: UserRole) {
    const user = await this.userRepository.findOneOr404(id)
    if (role === user.role) return false
    user.role = role
    await user.save()
    return true
  }

  /**
   * 查询指定用户
   */
  async queryUser(id: number) {
    const user = await this.userRepository.findOneOr404(id)
    return user
  }

  /**
   * 查询所有用户
   */
  async queryAllUser() {
    const users = await this.userRepository.findAll()
    return users
  }

  /**
   * 查询用户列表（带分页），模糊匹配（username，nickname）
   */
  async queryList(dto: ListQueryConditionDTO): Promise<ListQueryResultDTO<UserEntity>> {
    const { size, current, order } = dto
    const [list, total] = await this.userRepository.findAllAndCount({
      order: { id: order },
      take: size,
      skip: (current - 1) * size,
      where: [{ username: Like(`%${dto.keyword.trim()}%`) }, { nickname: Like(`%${dto.keyword.trim()}%`) }],
    })
    const result: ListQueryResultDTO<UserEntity> = plainToClass(ListQueryResultDTO, {
      current,
      size,
      total,
      list,
    })
    return result
  }
}
