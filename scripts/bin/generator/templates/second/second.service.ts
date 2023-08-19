import { Pagination } from "@dongjiang-recruitment/nest-common/dist/decorator";
import {
  FindOptionsWhere,
  InjectRepository,
  Repository,
} from "@dongjiang-recruitment/nest-common/dist/typeorm";
import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateSecondDto } from "./dto/create-second.dto";
import { UpdateSecondDto } from "./dto/update-second.dto";
import { Second } from "./entities/second.entity";

@Injectable()
export class SecondService {
  constructor(
    @InjectRepository(Second)
    private readonly secondRepository: Repository<Second>
  ) {}

  async create(firstId: string, createSecondDto: CreateSecondDto) {
    return await this.secondRepository.save({
      ...createSecondDto,
      firstId,
    });
  }

  async findAll(
    firstId: string,
    query: Array<FindOptionsWhere<Second>>,
    { page, size, sort }: Pagination<Second>
  ) {
    return {
      total: await this.secondRepository.count({
        where: query.map((q) => ({ ...q, firstId })),
      }),
      items: await this.secondRepository.find({
        where: { ...query, firstId },
        skip: page * size,
        take: size,
        order: sort,
      }),
    };
  }

  async findOne(firstId: string, id: string) {
    const second = await this.secondRepository.findOne({
      where: { firstId, id },
    });
    if (!second) throw new NotFoundException();
    return second;
  }

  async update(firstId: string, id: string, updateSecondDto: UpdateSecondDto) {
    const second = { ...updateSecondDto, firstId, id };
    const { affected } = await this.secondRepository.update(id, second);
    if (!affected) throw new NotFoundException();
    return second;
  }

  async remove(firstId: string, id: string) {
    const { affected } = await this.secondRepository.softDelete(id);
    if (!affected) throw new NotFoundException();
    return id;
  }
}
