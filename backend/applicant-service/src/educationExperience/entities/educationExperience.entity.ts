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
 * EducationExperience
 */
@Entity()
export class EducationExperience {
  /**
   * 教育经历ID
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
   * 入学时间
   */
  @Column({
    nullable: true,
  })
  admissionTime: string;
  /**
   * 学历层次，{1:大专,2:本科,3:硕士,4:博士}
   */
  @Column({
    nullable: true,
  })
  education: number;
  /**
   * 毕业时间
   */
  @Column({
    nullable: true,
  })
  graduationTime: string;
  /**
   * 专业名称
   */
  @Column({
    nullable: true,
  })
  majorName: string;
  /**
   * 学校名称
   */
  @Column({
    nullable: true,
  })
  schoolName: string;
  /**
   * 求职者
   */
  @ManyToOne(() => Applicant, (applicant) => applicant.id, {
    eager: true,
  })
  @JoinColumn()
  applicant: Applicant;
}
