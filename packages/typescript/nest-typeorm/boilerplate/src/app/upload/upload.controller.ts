import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'

import { UserRole } from '@/database/entities/user.entity'
import { Authorization } from '@/guards/authorization.guard'
import { ApiBaseInfo } from '@/plugins/swagger'
import { UploadService } from './upload.service'
import { ReceivedFileDTO } from './upload.dto'

@Controller('/upload')
@ApiTags('上传接口')
export class UploadController {
  constructor(private uploadService: UploadService) {}

  @Post('/image')
  @Authorization(UserRole.Member)
  @UseInterceptors(FileInterceptor('file'))
  @ApiBaseInfo({ title: '单图片上传' })
  @ApiOkResponse({ type: ReceivedFileDTO })
  async receiveImage(@UploadedFile() file: Express.Multer.File) {
    return this.uploadService.receiveImage(file)
  }
}
