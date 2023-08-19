import { Pagination } from "@dongjiang-recruitment/nest-common/dist/decorator";
import {
  FindOptionsWhere,
  InjectRepository,
  Repository,
} from "@dongjiang-recruitment/nest-common/dist/typeorm";
import { Injectable, NotFoundException } from "@nestjs/common";
import { DeliveryRecord } from "src/deliveryRecord/entities/deliveryRecord.entity";
import { InspectionRecord } from "src/inspectionRecord/entities/inspectionRecord.entity";
import { CreateApplicantDto } from "./dto/create-applicant.dto";
import { UpdateApplicantDto } from "./dto/update-applicant.dto";
import { Applicant } from "./entities/applicant.entity";

@Injectable()
export class ApplicantService {
  constructor(
    @InjectRepository(Applicant)
    private readonly applicantRepository: Repository<Applicant>,
    @InjectRepository(DeliveryRecord)
    private readonly deliveryRecordRepository: Repository<DeliveryRecord>,
    @InjectRepository(InspectionRecord)
    private readonly inspectionRecordRepository: Repository<InspectionRecord>
  ) {}

  async create(createApplicantDto: CreateApplicantDto) {
    return await this.applicantRepository.save(createApplicantDto);
  }

  async findAll(
    query: Array<FindOptionsWhere<Applicant>>,
    { page, size, sort }: Pagination<Applicant>
  ) {
    return {
      total: await this.applicantRepository.count({
        where: query,
      }),
      items: await this.applicantRepository.find({
        where: query,
        skip: page * size,
        take: size,
        order: sort,
      }),
    };
  }

  async findAllInspectionRecords(
    query: FindOptionsWhere<InspectionRecord>[],
    page: Pagination<InspectionRecord>
  ) {
    return {
      total: await this.inspectionRecordRepository.count({
        where: query,
      }),
      items: await this.inspectionRecordRepository.find({
        where: query,
        skip: page.page * page.size,
        take: page.size,
        order: page.sort,
      }),
    };
  }

  async findAllDeliveryRecords(
    query: FindOptionsWhere<DeliveryRecord>[],
    page: Pagination<DeliveryRecord>
  ) {
    return {
      total: await this.deliveryRecordRepository.count({
        where: query,
      }),
      items: await this.deliveryRecordRepository.find({
        where: query,
        skip: page.page * page.size,
        take: page.size,
        order: page.sort,
      }),
    };
  }

  async findOne(id: string) {
    const applicant = await this.applicantRepository.findOne({
      where: { id },
    });
    if (!applicant) throw new NotFoundException();
    return applicant;
  }

  async update(id: string, updateApplicantDto: UpdateApplicantDto) {
    const applicant = {
      ...updateApplicantDto,
      id,
    };
    const { affected } = await this.applicantRepository.update(id, applicant);
    if (!affected) throw new NotFoundException();
    return applicant;
  }

  async remove(id: string) {
    const { affected } = await this.applicantRepository.softDelete(id);
    if (!affected) throw new NotFoundException();
    return id;
  }
}
