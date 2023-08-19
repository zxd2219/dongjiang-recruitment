import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "@dongjiang-recruitment/nest-common/dist/typeorm";
import { Applicant } from "src/applicant/entities/applicant.entity";

/**
 * WorkExperience
 */
@Entity()
export class WorkExperience {
  /**
   * 工作经历ID
   */
  @PrimaryGeneratedColumn("uuid")
  id: string;
  /**
   * 创建时间
   */
  @CreateDateColumn()
  createdAt: Date;
  /**
   * 修改时间
   */
  @UpdateDateColumn()
  updatedAt: Date;
  /**
   * 移除时间
   */
  @DeleteDateColumn()
  deletedAt: Date;
  /**
   * 公司领域
   */
  @Column({
    nullable: true,
  })
  companyIndustry: string;
  /**
   * 公司名称
   */
  @Column({
    nullable: true,
  })
  companyName: string;
  /**
   * 部门名称
   */
  @Column({
    nullable: true,
  })
  departmentName: string;
  /**
   * 离职时间
   */
  @Column({
    nullable: true,
  })
  endTime: string;
  /**
   * 工作内容
   */
  @Column({
    nullable: true,
  })
  jobContent: string;
  /**
   * 职位名称
   */
  @Column({
    nullable: true,
  })
  positionName: string;
  /**
   * 职位类型，{1:全职,2:兼职,3:实习}
   */
  @Column({
    nullable: true,
  })
  positionType: number;
  /**
   * 就职时间
   */
  @Column({
    nullable: true,
  })
  startTime: string;
  /**
   * 求职者
   */
  @ManyToOne(() => Applicant, (applicant) => applicant.id, {
    eager: true,
  })
  @JoinColumn()
  applicant: Applicant;
}
