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
 * ProjectExperience
 */
@Entity()
export class ProjectExperience {
  /**
   * 项目经历ID
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
   * 我的成就
   */
  @Column({
    nullable: true,
  })
  achievement: string;
  /**
   * 结束时间
   */
  @Column({
    nullable: true,
  })
  endTime: string;
  /**
   * 项目描述
   */
  @Column({
    nullable: true,
  })
  projectDescription: string;
  /**
   * 项目链接
   */
  @Column({
    nullable: true,
  })
  projectLink: string;
  /**
   * 项目名称
   */
  @Column({
    nullable: true,
  })
  projectName: string;
  /**
   * 开始时间
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
