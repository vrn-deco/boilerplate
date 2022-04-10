/*
 * @Author: Cphayim
 * @Date: 2021-04-17 15:44:22
 * @Description: 用户控制器
 */

import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'

import { UserEntity, UserRole } from '@/database/entities/user.entity'
import { Authorization, CurrentUser } from '@/guards/authorization.guard'
import { ApiBaseInfo } from '@/plugins/swagger'
import { AuthService } from '../auth/auth.service'
import { AuthTokenDTO } from '../auth/auth.dto'
import { UserChangeRoleDTO, UserLoginDTO, UserRegisterDTO } from './user.dto'
import { UserService } from './user.service'
import { ListQueryConditionDTO } from '@/libs/dto'

@Controller('/user')
@ApiTags('用户接口')
export class UserController {
  constructor(private readonly authService: AuthService, private readonly userService: UserService) {}

  @Post('/login')
  @ApiBaseInfo({ title: '账号登录' })
  @ApiOkResponse({ type: AuthTokenDTO })
  async login(@Body() dto: UserLoginDTO) {
    const user = await this.userService.verifyByAccount(dto)
    return this.authService.signToken(user)
  }

  @Post('/register')
  @ApiBaseInfo({ title: '账号注册' })
  @ApiOkResponse({ type: AuthTokenDTO })
  async register(@Body() dto: UserRegisterDTO) {
    const user = await this.userService.createUserByAccount(dto)
    return this.authService.signToken(user)
  }

  @Get('/profile')
  @Authorization(UserRole.Member)
  @ApiBaseInfo({ title: '查询当前用户信息', role: UserRole.Member })
  @ApiOkResponse({ type: UserEntity })
  async profileSelf(@CurrentUser() user: UserEntity) {
    return user
  }

  @Get('/profile/all')
  @Authorization(UserRole.Admin)
  @ApiBaseInfo({ title: '查询所有用户信息', role: UserRole.Admin })
  @ApiOkResponse({ type: [UserEntity] })
  async profileAll() {
    return this.userService.queryAllUser()
  }

  @Get('/profile/:uid')
  @Authorization(UserRole.Admin)
  @ApiBaseInfo({ title: '查询指定用户信息', role: UserRole.Admin })
  @ApiOkResponse({ type: UserEntity })
  async profileItem(@Param('uid', ParseIntPipe) id: number) {
    return this.userService.queryUser(id)
  }

  @Get('/list')
  @Authorization(UserRole.Admin)
  @ApiBaseInfo({ title: '搜索用户列表（分页）', role: UserRole.Admin })
  @ApiOkResponse({ type: [UserEntity] })
  async list(@Query() dto: ListQueryConditionDTO) {
    return this.userService.queryList(dto)
  }

  @Put('/crole/:uid')
  @Authorization(UserRole.SuperAdmin)
  @ApiBaseInfo({ title: '修改用户角色', role: UserRole.SuperAdmin })
  @ApiOkResponse({ description: '修改结果', type: Boolean })
  async changeRoleById(
    @CurrentUser() user: UserEntity,
    @Param('uid', ParseIntPipe) id: number,
    @Body() dto: UserChangeRoleDTO,
  ) {
    // 不能修改自己的用户角色
    if (user.id === id) throw new ForbiddenException('不能修改自己的用户角色')
    return this.userService.updateRole(id, dto.role)
  }

  @Delete('/remove/:uid')
  @Authorization(UserRole.SuperAdmin)
  @ApiBaseInfo({ title: `删除指定的用户`, role: UserRole.SuperAdmin })
  @ApiOkResponse({ type: Boolean })
  async delete(@CurrentUser() user: UserEntity, @Param('uid', ParseIntPipe) id: number) {
    // 不能删除自己
    if (user.id === id) throw new ForbiddenException('不能删除自己')
    return this.userService.deleteUser(id)
  }
}
