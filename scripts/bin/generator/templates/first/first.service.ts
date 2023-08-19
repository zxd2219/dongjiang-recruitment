import { Pagination } from "@dongjiang-recruitment/nest-common/dist/decorator";
import {
  FindOptionsWhere,
  InjectRepository,
  Repository,
} from "@dongjiang-recruitment/nest-common/dist/typeorm";
import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateFirstDto } from "./dto/create-first.dto";
import { UpdateFirstDto } from "./dto/update-first.dto";
import { First } from "./entities/first.entity";

@Injectable()
export class FirstService {
  constructor(
    @InjectRepository(First)
    private readonly firstRepository: Repository<First>
  ) {}

  async create(createFirstDto: CreateFirstDto) {
    return await this.firstRepository.save(createFirstDto);
  }

  async findAll(
    query: Array<FindOptionsWhere<First>>,
    { page, size, sort }: Pagination<First>
  ) {
    return {
      total: await this.firstRepository.count({
        where: query,
      }),
      items: await this.firstRepository.find({
        where: query,
        skip: page * size,
        take: size,
        order: sort,
      }),
    };
  }

  async findOne(id: string) {
    const first = await this.firstRepository.findOne({
      where: { id },
    });
    if (!first) throw new NotFoundException();
    return first;
  }

  async update(id: string, updateFirstDto: UpdateFirstDto) {
    const first = {
      ...updateFirstDto,
      id,
    };
    const { affected } = await this.firstRepository.update(id, first);
    if (!affected) throw new NotFoundException();
    return first;
  }

  async remove(id: string) {
    const { affected } = await this.firstRepository.softDelete(id);
    if (!affected) throw new NotFoundException();
    return id;
  }
}
