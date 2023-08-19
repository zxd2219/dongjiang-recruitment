import { Pagination } from "@dongjiang-recruitment/nest-common/dist/decorator";
import {
  FindOptionsWhere,
  InjectRepository,
  Repository,
} from "@dongjiang-recruitment/nest-common/dist/typeorm";
import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateAdvertiseDto } from "./dto/create-advertise.dto";
import { UpdateAdvertiseDto } from "./dto/update-advertise.dto";
import { Advertise } from "./entities/advertise.entity";

@Injectable()
export class AdvertiseService {
  constructor(
    @InjectRepository(Advertise)
    private readonly advertiseRepository: Repository<Advertise>
  ) {}

  async create(advertiserId: string, createAdvertiseDto: CreateAdvertiseDto) {
    return await this.advertiseRepository.save({
      ...createAdvertiseDto,
      advertiser: {
        id: advertiserId,
      },
    });
  }

  async findAll(
    advertiserId: string,
    query: Array<FindOptionsWhere<Advertise>>,
    { page, size, sort }: Pagination<Advertise>
  ) {
    if (query.length === 0) query.push({});
    return {
      total: await this.advertiseRepository.count({
        where: query.map((q) => ({
          ...q,
          advertiser: {
            id: advertiserId,
          },
        })),
      }),
      items: await this.advertiseRepository.find({
        where: query.map((q) => ({
          ...q,
          advertiser: {
            id: advertiserId,
          },
        })),
        skip: page * size,
        take: size,
        order: sort,
      }),
    };
  }

  async findOne(advertiserId: string, id: string) {
    const advertise = await this.advertiseRepository.findOne({
      where: {
        advertiser: {
          id: advertiserId,
        },
        id,
      },
    });
    if (!advertise) throw new NotFoundException();
    return advertise;
  }

  async update(
    advertiserId: string,
    id: string,
    updateAdvertiseDto: UpdateAdvertiseDto
  ) {
    const advertise = {
      ...updateAdvertiseDto,
      advertiser: {
        id: advertiserId,
      },
      id,
    };
    const { affected } = await this.advertiseRepository.update(id, advertise);
    if (!affected) throw new NotFoundException();
    return advertise;
  }

  async remove(advertiserId: string, id: string) {
    const { affected } = await this.advertiseRepository.softDelete(id);
    if (!affected) throw new NotFoundException();
    return id;
  }
}
