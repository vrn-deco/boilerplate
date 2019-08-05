import { InjectRepository, InjectConnection } from '@nestjs/typeorm'
import { Injectable, NotFoundException } from '@nestjs/common'
import { Repository, Connection } from 'typeorm'

import { Cat } from '../../entities/cat.entity'
import { CreateCatDto, UpdateCatDto } from './dto/cats.dto'
import { CatMetadata } from '../../entities/cat-metadata.entity'
import { Master } from '../../entities/master.entity'

@Injectable()
export class CatsService {
  constructor(
    @InjectConnection()
    private readonly connection: Connection,
    @InjectRepository(Cat)
    private readonly catRepository: Repository<Cat>,
    @InjectRepository(CatMetadata)
    private readonly catMetadataRepository: Repository<CatMetadata>,
    @InjectRepository(Master)
    private readonly masterRepository: Repository<Master>,
  ) {}

  async create(dto: CreateCatDto) {
    // this.cats.push(cat)
    const cat = new Cat()
    cat.name = dto.name
    cat.age = dto.age
    cat.breed = dto.breed

    const metadata = new CatMetadata()
    metadata.width = 300
    metadata.height = 500
    // metadata.cat = cat

    cat.metadata = metadata

    await this.catRepository.save(cat)
    // await this.catMetadataRepository.save(metadata)
    return cat
  }

  async findAll(): Promise<Cat[]> {
    // return this.catRepository.find({ relations: ['metadata', 'master'] })
    const query = this.catRepository
      .createQueryBuilder('cat')
      .innerJoinAndSelect('cat.metadata', 'metadata', 'metadata.id = :metaId', {
        metaId: 2,
      })
      .leftJoinAndSelect('cat.master', 'master')
      .where('cat.breed = :breedName')
      .setParameter('breedName', '英国短毛猫')
    console.log(query.getSql())
    return query.getMany()
  }

  async findOneById(id: number): Promise<Cat> {
    try {
      return await this.catRepository.findOneOrFail(id)
    } catch (e) {
      throw new NotFoundException()
    }
  }

  async updateById(id: number, dto: UpdateCatDto) {
    const cat = await this.catRepository.findOne({ id })
    if (!cat) {
      throw new NotFoundException()
    }
    await this.catRepository.update(id, dto)
  }
}
