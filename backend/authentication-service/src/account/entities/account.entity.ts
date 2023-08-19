import { Exclude } from "@dongjiang-recruitment/nest-common/dist/transform";
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "@dongjiang-recruitment/nest-common/dist/typeorm";
import { AuthorityGroup } from "src/authority-group/entities/authority-group.entity";
import { Authority } from "src/authority/entities/authority.entity";

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
  @ManyToMany(() => Authority, (authority) => authority.accounts, {
    eager: true,
    cascade: true,
    onUpdate: "CASCADE",
    onDelete: "NO ACTION",
  })
  @JoinTable()
  authorities: Authority[];
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
  @Column("simple-json", {
    nullable: true,
  })
  detailId: DetailId;
  /**
   * 权限组列表
   */
  @ManyToMany(
    () => AuthorityGroup,
    (authorityGroup) => authorityGroup.accounts,
    {
      eager: true,
    }
  )
  @JoinTable()
  authorityGroups: AuthorityGroup[];
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
  @Column({
    nullable: true,
  })
  userName: string;
  /**
   * 密码
   */
  @Column({
    nullable: true,
  })
  @Exclude()
  password: string;
}
