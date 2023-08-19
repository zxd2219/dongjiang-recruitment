import { Pagination } from "@dongjiang-recruitment/nest-common/dist/decorator";
import {
  FindOptionsWhere,
  InjectRepository,
  Repository,
} from "@dongjiang-recruitment/nest-common/dist/typeorm";
import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateEducationExperienceDto } from "./dto/create-educationExperience.dto";
import { UpdateEducationExperienceDto } from "./dto/update-educationExperience.dto";
import { EducationExperience } from "./entities/educationExperience.entity";

@Injectable()
export class EducationExperienceService {
  constructor(
    @InjectRepository(EducationExperience)
    private readonly educationExperienceRepository: Repository<EducationExperience>
  ) {}

  async create(
    applicantId: string,
    createEducationExperienceDto: CreateEducationExperienceDto
  ) {
    return await this.educationExperienceRepository.save({
      ...createEducationExperienceDto,
      applicant: {
        id: applicantId,
      },
    });
  }

  async findAll(
    applicantId: string,
    query: Array<FindOptionsWhere<EducationExperience>>,
    { page, size, sort }: Pagination<EducationExperience>
  ) {
    if (query.length === 0) query.push({});
    return {
      total: await this.educationExperienceRepository.count({
        where: query.map((q) => ({
          ...q,
          applicant: {
            id: applicantId,
          },
        })),
      }),
      items: await this.educationExperienceRepository.find({
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
    const educationExperience =
      await this.educationExperienceRepository.findOne({
        where: {
          applicant: {
            id: applicantId,
          },
          id,
        },
      });
    if (!educationExperience) throw new NotFoundException();
    return educationExperience;
  }

  async update(
    applicantId: string,
    id: string,
    updateEducationExperienceDto: UpdateEducationExperienceDto
  ) {
    const educationExperience = {
      ...updateEducationExperienceDto,
      applicant: {
        id: applicantId,
      },
      id,
    };
    const { affected } = await this.educationExperienceRepository.update(
      id,
      educationExperience
    );
    if (!affected) throw new NotFoundException();
    return educationExperience;
  }

  async remove(applicantId: string, id: string) {
    const { affected } = await this.educationExperienceRepository.softDelete(
      id
    );
    if (!affected) throw new NotFoundException();
    return id;
  }
}
