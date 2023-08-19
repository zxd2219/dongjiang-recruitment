import { Pagination } from "@dongjiang-recruitment/nest-common/dist/decorator";
import {
  FindOptionsWhere,
  InjectRepository,
  Repository,
} from "@dongjiang-recruitment/nest-common/dist/typeorm";
import { Injectable, NotFoundException } from "@nestjs/common";
import { Advertise } from "src/advertise/entities/advertise.entity";
import { CreateAdvertiserDto } from "./dto/create-advertiser.dto";
import { UpdateAdvertiserDto } from "./dto/update-advertiser.dto";
import { Advertiser } from "./entities/advertiser.entity";

@Injectable()
export class AdvertiserService {
  constructor(
    @InjectRepository(Advertiser)
    private readonly advertiserRepository: Repository<Advertiser>,
    @InjectRepository(Advertise)
    private readonly advertiseRepository: Repository<Advertise>
  ) {}

  async create(createAdvertiserDto: CreateAdvertiserDto) {
    return await this.advertiserRepository.save(createAdvertiserDto);
  }

  async findAll(
    query: Array<FindOptionsWhere<Advertiser>>,
    { page, size, sort }: Pagination<Advertiser>
  ) {
    return {
      total: await this.advertiserRepository.count({
        where: query,
      }),
      items: await this.advertiserRepository.find({
        where: query,
        skip: page * size,
        take: size,
        order: sort,
      }),
    };
  }

  async findAllAdvertise(
    query: FindOptionsWhere<Advertiser>[],
    { page, size, sort }: Pagination<Advertiser>
  ) {
    return {
      total: await this.advertiseRepository.count({
        where: query,
      }),
      items: await this.advertiseRepository.find({
        where: query,
        skip: page * size,
        take: size,
        order: sort,
      }),
    };
  }

  async findOne(id: string) {
    const advertiser = await this.advertiserRepository.findOne({
      where: { id },
    });
    if (!advertiser) throw new NotFoundException();
    return advertiser;
  }

  async update(id: string, updateAdvertiserDto: UpdateAdvertiserDto) {
    const advertiser = {
      ...updateAdvertiserDto,
      id,
    };
    const { affected } = await this.advertiserRepository.update(id, advertiser);
    if (!affected) throw new NotFoundException();
    return advertiser;
  }

  async remove(id: string) {
    const { affected } = await this.advertiserRepository.softDelete(id);
    if (!affected) throw new NotFoundException();
    return id;
  }
}
