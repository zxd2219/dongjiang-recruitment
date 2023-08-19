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
 * JobExpectation
 */
@Entity()
export class JobExpectation {
  /**
   * 求职期望ID
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
   * 上限薪资，单位K
   */
  @Column({
    nullable: true,
  })
  ceilingSalary: number;
  /**
   * 期望城市
   */
  @Column({
    nullable: true,
  })
  cityName: string;
  /**
   * 细分标签
   */
  @Column("simple-array", {
    nullable: true,
  })
  directionTags: string[];
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
   * 起始薪资，单位K
   */
  @Column({
    nullable: true,
  })
  startingSalary: number;
  /**
   * 求职者
   */
  @ManyToOne(() => Applicant, (applicant) => applicant.id, {
    eager: true,
  })
  @JoinColumn()
  applicant: Applicant;
}
