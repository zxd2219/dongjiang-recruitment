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
import { Company, Position } from "src/external.entity";

/**
 * DeliveryRecord
 */
@Entity()
export class DeliveryRecord {
  /**
   * ID
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
   * 求职者
   */
  @ManyToOne(() => Applicant, (applicant) => applicant.id, {
    eager: true,
  })
  @JoinColumn()
  applicant: Applicant;
  /**
   * 公司
   */
  @ManyToOne(() => Company, (company) => company.id, {
    eager: true,
  })
  @JoinColumn()
  company: Company;
  /**
   * 面试时间
   */
  @Column({
    nullable: true,
  })
  interviewTime: Date;
  /**
   * 职位
   */
  @ManyToOne(() => Position, (position) => position.id, {
    eager: true,
  })
  @JoinColumn()
  position: Position;
  /**
   * 投递状态，{1:待查看,2:已查看,3:通过筛选,4:约面试,5:不合适}
   */
  @Column({
    nullable: true,
  })
  status: number;
}
