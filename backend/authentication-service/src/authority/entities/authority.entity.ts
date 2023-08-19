import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "@dongjiang-recruitment/nest-common/dist/typeorm";
import { Account } from "src/account/entities/account.entity";
import { AuthorityGroup } from "src/authority-group/entities/authority-group.entity";
/**
 * Authority
 */
@Entity()
export class Authority {
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
   * 权限ID
   */
  @PrimaryGeneratedColumn("uuid")
  id: string;
  /**
   * 名称
   */
  @Column({
    nullable: true,
  })
  name: string;
  /**
   * 修改时间
   */
  @UpdateDateColumn()
  updatedAt: Date;
  /**
   * 用户列表
   */
  @ManyToMany(() => Account, (account) => account.authorities)
  accounts: Account[];
  /**
   * 权限组列表
   */
  @ManyToMany(
    () => AuthorityGroup,
    (authorityGroup) => authorityGroup.authorities
  )
  authorityGroups: AuthorityGroup[];
}
