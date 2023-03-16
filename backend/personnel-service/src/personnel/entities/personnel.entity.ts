import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "@dongjiang-recruitment/nest-common/dist/typeorm";
/**
 * Personnel
 */
@Entity()
export class Personnel {
  /**
   * 电子邮箱
   */
  @Column()
  acceptEmail: string;
  /**
   * 头像地址
   */
  @Column()
  avatarUrl: string;
  /**
   * 公司ID
   */
  @Column()
  companyId: string;
  /**
   * 创建时间
   */
  @CreateDateColumn()
  createdAt: Date;
  /**
   * 移除时间
   */
  @DeleteDateColumn()
  deletedAt: Date;
  /**
   * 人事姓名
   */
  @Column()
  hrName: string;
  /**
   * 人事ID
   */
  @PrimaryGeneratedColumn("uuid")
  id: string;
  /**
   * 职位名称
   */
  @Column()
  postName: string;
  /**
   * 更新时间
   */
  @UpdateDateColumn()
  updatedAt: Date;
}
