import {
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
 * GarnerRecord
 */
@Entity()
export class GarnerRecord {
  /**
   * 收藏记录ID
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
   * 职位
   */
  @ManyToOne(() => Position, (position) => position.id, {
    eager: true,
  })
  @JoinColumn()
  position: Position;
}
