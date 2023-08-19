import { Pagination } from "@dongjiang-recruitment/nest-common/dist/decorator";
import {
  FindOptionsWhere,
  InjectRepository,
  Repository,
} from "@dongjiang-recruitment/nest-common/dist/typeorm";
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateInspectionRecordDto } from "./dto/create-inspectionRecord.dto";
import { UpdateInspectionRecordDto } from "./dto/update-inspectionRecord.dto";
import { InspectionRecord } from "./entities/inspectionRecord.entity";

@Injectable()
export class InspectionRecordService {
  constructor(
    @InjectRepository(InspectionRecord)
    private readonly inspectionRecordRepository: Repository<InspectionRecord>
  ) {}

  async create(
    personnelId: string,
    createInspectionRecordDto: CreateInspectionRecordDto
  ) {
    const inspectionRecord = await this.inspectionRecordRepository.findOne({
      // @ts-ignore
      where: {
        ...createInspectionRecordDto,
        personnel: {
          id: personnelId,
        },
      },
    });
    if (inspectionRecord && inspectionRecord.deletedAt === null) {
      throw new BadRequestException("已经查看过该求职者");
    } else if (inspectionRecord && inspectionRecord.deletedAt !== null) {
      await this.inspectionRecordRepository.restore(inspectionRecord.id);
      return inspectionRecord;
    }
    return await this.inspectionRecordRepository.save({
      ...createInspectionRecordDto,
      personnel: {
        id: personnelId,
      },
    });
  }

  async findAll(
    personnelId: string,
    query: Array<FindOptionsWhere<InspectionRecord>>,
    { page, size, sort }: Pagination<InspectionRecord>
  ) {
    if (query.length === 0) query.push({});
    return {
      total: await this.inspectionRecordRepository.count({
        where: query.map((q) => ({
          ...q,
          personnel: {
            id: personnelId,
          },
        })),
      }),
      items: await this.inspectionRecordRepository.find({
        where: query.map((q) => ({
          ...q,
          personnel: {
            id: personnelId,
          },
        })),
        skip: page * size,
        take: size,
        order: sort,
      }),
    };
  }

  async findOne(personnelId: string, id: string) {
    const inspectionRecord = await this.inspectionRecordRepository.findOne({
      where: {
        personnel: {
          id: personnelId,
        },
        id,
      },
    });
    if (!inspectionRecord) throw new NotFoundException();
    return inspectionRecord;
  }

  async update(
    personnelId: string,
    id: string,
    updateInspectionRecordDto: UpdateInspectionRecordDto
  ) {
    const inspectionRecord = {
      ...updateInspectionRecordDto,
      personnel: {
        id: personnelId,
      },
      id,
    };
    const { affected } = await this.inspectionRecordRepository.update(
      id,
      inspectionRecord
    );
    if (!affected) throw new NotFoundException();
    return inspectionRecord;
  }

  async remove(personnelId: string, id: string) {
    const { affected } = await this.inspectionRecordRepository.softDelete(id);
    if (!affected) throw new NotFoundException();
    return id;
  }
}
