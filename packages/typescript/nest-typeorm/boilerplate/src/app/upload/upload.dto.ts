import { ResponseDTO } from '@/libs/decorator'

@ResponseDTO()
export class ReceivedFileDTO {
  fileUrl: string
}
