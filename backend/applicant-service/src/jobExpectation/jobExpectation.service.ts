import { Pagination } from "@dongjiang-recruitment/nest-common/dist/decorator";
import {
  FindOptionsWhere,
  InjectRepository,
  Repository,
} from "@dongjiang-recruitment/nest-common/dist/typeorm";
import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateJobExpectationDto } from "./dto/create-jobExpectation.dto";
import { UpdateJobExpectationDto } from "./dto/update-jobExpectation.dto";
import { JobExpectation } from "./entities/jobExpectation.entity";

@Injectable()
export class JobExpectationService {
  constructor(
    @InjectRepository(JobExpectation)
    private readonly jobExpectationRepository: Repository<JobExpectation>
  ) {}

  async create(
    applicantId: string,
    createJobExpectationDto: CreateJobExpectationDto
  ) {
    return await this.jobExpectationRepository.save({
      ...createJobExpectationDto,
      applicant: {
        id: applicantId,
      },
    });
  }

  async findAll(
    applicantId: string,
    query: Array<FindOptionsWhere<JobExpectation>>,
    { page, size, sort }: Pagination<JobExpectation>
  ) {
    if (query.length === 0) query.push({});
    return {
      total: await this.jobExpectationRepository.count({
        where: query.map((q) => ({
          ...q,
          applicant: {
            id: applicantId,
          },
        })),
        relations: ["applicant"],
      }),
      items: await this.jobExpectationRepository.find({
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
    const jobExpectation = await this.jobExpectationRepository.findOne({
      where: {
        applicant: {
          id: applicantId,
        },
        id,
      },
    });
    if (!jobExpectation) throw new NotFoundException();
    return jobExpectation;
  }

  async update(
    applicantId: string,
    id: string,
    updateJobExpectationDto: UpdateJobExpectationDto
  ) {
    const jobExpectation = {
      ...updateJobExpectationDto,
      applicant: {
        id: applicantId,
      },
      id,
    };
    const { affected } = await this.jobExpectationRepository.update(
      id,
      jobExpectation
    );
    if (!affected) throw new NotFoundException();
    return jobExpectation;
  }

  async remove(applicantId: string, id: string) {
    const { affected } = await this.jobExpectationRepository.softDelete(id);
    if (!affected) throw new NotFoundException();
    return id;
  }
}
