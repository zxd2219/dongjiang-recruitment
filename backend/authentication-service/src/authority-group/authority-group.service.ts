import { Pagination } from "@dongjiang-recruitment/nest-common/dist/decorator";
import {
  FindOptionsWhere,
  InjectRepository,
  Repository,
} from "@dongjiang-recruitment/nest-common/dist/typeorm";
import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateAuthorityGroupDto } from "./dto/create-authority-group.dto";
import { UpdateAuthorityGroupDto } from "./dto/update-authority-group.dto";
import { AuthorityGroup } from "./entities/authority-group.entity";

@Injectable()
export class AuthorityGroupService {
  constructor(
    @InjectRepository(AuthorityGroup)
    private readonly authorityGroupRepository: Repository<AuthorityGroup>
  ) {}

  async create(createAuthorityGroupDto: CreateAuthorityGroupDto) {
    return await this.authorityGroupRepository.save(createAuthorityGroupDto);
  }

  async findAll(
    query: Array<FindOptionsWhere<AuthorityGroup>>,
    { page, size, sort }: Pagination<AuthorityGroup>
  ) {
    return {
      total: await this.authorityGroupRepository.count({
        where: query,
      }),
      items: await this.authorityGroupRepository.find({
        where: query,
        skip: page * size,
        take: size,
        order: sort,
      }),
    };
  }

  async findOne(id: string) {
    const authorityGroup = await this.authorityGroupRepository.findOne({
      where: { id },
    });
    if (!authorityGroup) throw new NotFoundException();
    return authorityGroup;
  }

  async update(id: string, updateAuthorityGroupDto: UpdateAuthorityGroupDto) {
    const authorityGroup = {
      ...updateAuthorityGroupDto,
      id,
    };
    const newAuthorityGroup = await this.authorityGroupRepository.save(
      authorityGroup
    );
    if (!newAuthorityGroup) throw new NotFoundException();
    return newAuthorityGroup;
  }

  async remove(id: string) {
    const { affected } = await this.authorityGroupRepository.softDelete(id);
    if (!affected) throw new NotFoundException();
    return id;
  }
}
