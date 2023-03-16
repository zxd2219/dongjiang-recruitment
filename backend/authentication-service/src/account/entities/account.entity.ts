import { Exclude } from "@dongjiang-recruitment/nest-common/dist/transform";
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "@dongjiang-recruitment/nest-common/dist/typeorm";

/**
 * 详情ID
 */
export class DetailId {
  /**
   * 广告商
   */
  advertiser?: string;
  /**
   * 求职者
   */
  applicant?: string;
  /**
   * 管理员
   */
  manager?: string;
  /**
   * 人事
   */
  personnel?: string;
}

/**
 * Account
 */
@Entity()
export class Account {
  /**
   * 权限列表
   */
  @Column("simple-array")
  authorities: string[];
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
   * 详情ID
   */
  @Column("simple-json")
  detailId: DetailId;
  /**
   * 权限组列表
   */
  @Column("simple-array", {
    default: [],
  })
  groups: string[];
  /**
   * 账号ID
   */
  @PrimaryGeneratedColumn("uuid")
  id: string;
  /**
   * 更新时间
   */
  @UpdateDateColumn()
  updatedAt: Date;
  /**
   * 用户名
   */
  @Column()
  userName: string;
  /**
   * 密码
   */
  @Column()
  @Exclude()
  password: string;
}
