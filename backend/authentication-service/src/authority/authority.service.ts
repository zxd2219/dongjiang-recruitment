import { Pagination } from "@dongjiang-recruitment/nest-common/dist/decorator";
import {
  FindOptionsWhere,
  InjectRepository,
  Repository,
} from "@dongjiang-recruitment/nest-common/dist/typeorm";
import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateAuthorityDto } from "./dto/create-authority.dto";
import { UpdateAuthorityDto } from "./dto/update-authority.dto";
import { Authority } from "./entities/authority.entity";

@Injectable()
export class AuthorityService {
  constructor(
    @InjectRepository(Authority)
    private readonly authorityRepository: Repository<Authority>
  ) {}

  async create(createAuthorityDto: CreateAuthorityDto) {
    return await this.authorityRepository.save(createAuthorityDto);
  }

  async findAll(
    query: Array<FindOptionsWhere<Authority>>,
    { page, size, sort }: Pagination<Authority>
  ) {
    return {
      total: await this.authorityRepository.count({
        where: query,
      }),
      items: await this.authorityRepository.find({
        where: query,
        skip: page * size,
        take: size,
        order: sort,
      }),
    };
  }

  async findOne(id: string) {
    const authority = await this.authorityRepository.findOne({
      where: { id },
    });
    if (!authority) throw new NotFoundException();
    return authority;
  }

  async update(id: string, updateAuthorityDto: UpdateAuthorityDto) {
    const authority = {
      ...updateAuthorityDto,
      id,
    };
    const { affected } = await this.authorityRepository.update(id, authority);
    if (!affected) throw new NotFoundException();
    return authority;
  }

  async remove(id: string) {
    const { affected } = await this.authorityRepository.softDelete(id);
    if (!affected) throw new NotFoundException();
    return id;
  }
}
