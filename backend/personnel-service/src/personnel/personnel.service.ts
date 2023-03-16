import { Pagination } from "@dongjiang-recruitment/nest-common/dist/decorator";
import {
  FindOptionsWhere,
  InjectRepository,
  Repository,
} from "@dongjiang-recruitment/nest-common/dist/typeorm";
import { Injectable, NotFoundException } from "@nestjs/common";
import { CreatePersonnelDto } from "./dto/create-personnel.dto";
import { UpdatePersonnelDto } from "./dto/update-personnel.dto";
import { Personnel } from "./entities/personnel.entity";

@Injectable()
export class PersonnelService {
  constructor(
    @InjectRepository(Personnel)
    private readonly personnelRepository: Repository<Personnel>
  ) {}

  async create(createPersonnelDto: CreatePersonnelDto) {
    return await this.personnelRepository.save(createPersonnelDto);
  }

  async findAll(
    query: Array<FindOptionsWhere<Personnel>>,
    { page, size, sort }: Pagination<Personnel>
  ) {
    return {
      total: await this.personnelRepository.count({
        where: query,
      }),
      items: await this.personnelRepository.find({
        where: query,
        skip: page * size,
        take: size,
        order: sort,
      }),
    };
  }

  async findOne(id: string) {
    const personnel = await this.personnelRepository.findOne({
      where: { id },
    });
    if (!personnel) throw new NotFoundException();
    return personnel;
  }

  async update(id: string, updatePersonnelDto: UpdatePersonnelDto) {
    const personnel = {
      ...updatePersonnelDto,
      id,
    };
    const { affected } = await this.personnelRepository.update(id, personnel);
    if (!affected) throw new NotFoundException();
    return personnel;
  }

  async remove(id: string) {
    const { affected } = await this.personnelRepository.softDelete(id);
    if (!affected) throw new NotFoundException();
    return id;
  }
}
