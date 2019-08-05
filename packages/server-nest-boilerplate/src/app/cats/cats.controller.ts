import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UsePipes,
  UseGuards,
  UseInterceptors,
  ParseIntPipe,
} from '@nestjs/common'
import { ApiUseTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger'

import { RolesGuard } from '../../guards/roles.guard'
import { Roles } from '../../decorators/roles.decorator'
import { ROLE } from '../../constants/roles.contants'

import { CreateCatDto, UpdateCatDto } from './dto/cats.dto'
import { CatsService } from './cats.service'
import { Cat } from '../../entities/cat.entity'

@ApiUseTags('cats')
@Controller('cats')
@ApiBearerAuth()
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  // @Roles(ROLE.ADMIN)
  // @UseGuards(RolesGuard)
  async create(@Body() createCatDto: CreateCatDto): Promise<Cat> {
    return this.catsService.create(createCatDto)
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll()
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.catsService.findOneById(id)
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateCatDto: UpdateCatDto) {
    return this.catsService.updateById(id, updateCatDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} cat`
  }
}
