import { HttpException, HttpStatus } from '@nestjs/common'

export class CustomHttpException extends HttpException {
  code: number
  constructor({ message, code, status = HttpStatus.INTERNAL_SERVER_ERROR }) {
    super({ message }, status)
    this.code = code
  }
}
