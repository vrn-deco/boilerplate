import { Controller, Get, HttpException, HttpStatus, ForbiddenException, InternalServerErrorException } from '@nestjs/common'

@Controller('user')
export class UserController {
  @Get()
  findAll() {
    // throw new HttpException(
    //   {
    //     status: HttpStatus.FORBIDDEN,
    //     message: 'This is a custom message',
    //   },
    //   HttpStatus.FORBIDDEN,
    // )
    // console.log(new HttpException('a', HttpStatus.INTERNAL_SERVER_ERROR) instanceof Error)
    throw new ForbiddenException({ hh: '1' })
  }
}
