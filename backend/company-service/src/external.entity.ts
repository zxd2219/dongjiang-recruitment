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
import { Company } from "./company/entities/company.entity";

/**
 * Personnel
 */
@Entity()
export class Personnel {
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
   * 电子邮箱
   */
  @Column({
    nullable: true,
  })
  acceptEmail: string;
  /**
   * 头像地址
   */
  @Column({
    nullable: true,
  })
  avatarUrl: string;
  /**
   * 公司
   */
  @ManyToOne(() => Company, (company) => company.id, {
    eager: true,
  })
  @JoinColumn()
  company: Company;
  /**
   * 人事姓名
   */
  @Column({
    nullable: true,
  })
  hrName: string;
  /**
   * 职位名称
   */
  @Column({
    nullable: true,
  })
  postName: string;
}
