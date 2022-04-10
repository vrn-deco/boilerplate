import path from 'path'
import fs from 'fs-extra'

import { genUUID } from '@/libs/helper'
import { BadRequestException, Injectable } from '@nestjs/common'
import { config } from '@/config'
import { ReceivedFileDTO } from './upload.dto'

type StoreConf = {
  destDir: string
  urlPrefix: string
}

@Injectable()
export class UploadService {
  private imageStoreConf: StoreConf = {
    destDir: path.join(config.app.STATIC_DIR, 'images'),
    urlPrefix: `${config.app.STATIC_PREFIX}/images`,
  }

  async receiveImage(file: Express.Multer.File): Promise<ReceivedFileDTO> {
    const { buffer, mimetype } = file

    const ext = mimetype.match(/image\/(.*)/)?.[1]
    if (!ext) throw new BadRequestException('file is not a image')

    const name = `${genUUID()}.${ext}`

    await fs.mkdirp(this.imageStoreConf.destDir)
    await fs.promises.writeFile(path.join(this.imageStoreConf.destDir, name), buffer)

    return {
      fileUrl: `${this.imageStoreConf.urlPrefix}/${name}`,
    }
  }
}
