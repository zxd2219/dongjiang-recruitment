import { Pagination } from "@dongjiang-recruitment/nest-common/dist/decorator";
import {
  FindOptionsWhere,
  InjectRepository,
  Repository,
} from "@dongjiang-recruitment/nest-common/dist/typeorm";
import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateProjectExperienceDto } from "./dto/create-projectExperience.dto";
import { UpdateProjectExperienceDto } from "./dto/update-projectExperience.dto";
import { ProjectExperience } from "./entities/projectExperience.entity";

@Injectable()
export class ProjectExperienceService {
  constructor(
    @InjectRepository(ProjectExperience)
    private readonly projectExperienceRepository: Repository<ProjectExperience>
  ) {}

  async create(
    applicantId: string,
    createProjectExperienceDto: CreateProjectExperienceDto
  ) {
    return await this.projectExperienceRepository.save({
      ...createProjectExperienceDto,
      applicant: {
        id: applicantId,
      },
    });
  }

  async findAll(
    applicantId: string,
    query: Array<FindOptionsWhere<ProjectExperience>>,
    { page, size, sort }: Pagination<ProjectExperience>
  ) {
    if (query.length === 0) query.push({});
    return {
      total: await this.projectExperienceRepository.count({
        where: query.map((q) => ({
          ...q,
          applicant: {
            id: applicantId,
          },
        })),
      }),
      items: await this.projectExperienceRepository.find({
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
    const projectExperience = await this.projectExperienceRepository.findOne({
      where: {
        applicant: {
          id: applicantId,
        },
        id,
      },
    });
    if (!projectExperience) throw new NotFoundException();
    return projectExperience;
  }

  async update(
    applicantId: string,
    id: string,
    updateProjectExperienceDto: UpdateProjectExperienceDto
  ) {
    const projectExperience = {
      ...updateProjectExperienceDto,
      applicant: {
        id: applicantId,
      },
      id,
    };
    const { affected } = await this.projectExperienceRepository.update(
      id,
      projectExperience
    );
    if (!affected) throw new NotFoundException();
    return projectExperience;
  }

  async remove(applicantId: string, id: string) {
    const { affected } = await this.projectExperienceRepository.softDelete(id);
    if (!affected) throw new NotFoundException();
    return id;
  }
}
