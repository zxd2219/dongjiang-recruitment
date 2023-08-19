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
import { CreateAttentionRecordDto } from "./dto/create-attentionRecord.dto";
import { UpdateAttentionRecordDto } from "./dto/update-attentionRecord.dto";
import { AttentionRecord } from "./entities/attentionRecord.entity";

@Injectable()
export class AttentionRecordService {
  constructor(
    @InjectRepository(AttentionRecord)
    private readonly attentionRecordRepository: Repository<AttentionRecord>
  ) {}

  async create(
    applicantId: string,
    createAttentionRecordDto: CreateAttentionRecordDto
  ) {
    const attentionRecord = await this.attentionRecordRepository.findOne({
      // @ts-ignore
      where: {
        ...createAttentionRecordDto,
        applicant: {
          id: applicantId,
        },
      },
    });
    if (attentionRecord && attentionRecord.deletedAt === null) {
      throw new BadRequestException("已经关注过该公司");
    } else if (attentionRecord && attentionRecord.deletedAt !== null) {
      await this.attentionRecordRepository.restore(attentionRecord.id);
      return attentionRecord;
    }
    return await this.attentionRecordRepository.save({
      ...createAttentionRecordDto,
      applicant: {
        id: applicantId,
      },
    });
  }

  async findAll(
    applicantId: string,
    query: Array<FindOptionsWhere<AttentionRecord>>,
    { page, size, sort }: Pagination<AttentionRecord>
  ) {
    if (query.length === 0) query.push({});
    return {
      total: await this.attentionRecordRepository.count({
        where: query.map((q) => ({
          ...q,
          applicant: {
            id: applicantId,
          },
        })),
      }),
      items: await this.attentionRecordRepository.find({
        where: query.map((q) => ({
          ...q,
          applicant: {
            id: applicantId,
          },
        })),
        skip: page * size,
        take: size,
        order: sort,
      }),
    };
  }

  async findOne(applicantId: string, id: string) {
    const attentionRecord = await this.attentionRecordRepository.findOne({
      where: {
        applicant: {
          id: applicantId,
        },
        id,
      },
    });
    if (!attentionRecord) throw new NotFoundException();
    return attentionRecord;
  }

  async update(
    applicantId: string,
    id: string,
    updateAttentionRecordDto: UpdateAttentionRecordDto
  ) {
    const attentionRecord = {
      ...updateAttentionRecordDto,
      applicant: {
        id: applicantId,
      },
      id,
    };
    const { affected } = await this.attentionRecordRepository.update(
      id,
      attentionRecord
    );
    if (!affected) throw new NotFoundException();
    return attentionRecord;
  }

  async remove(applicantId: string, id: string) {
    const { affected } = await this.attentionRecordRepository.softDelete(id);
    if (!affected) throw new NotFoundException();
    return id;
  }
}
