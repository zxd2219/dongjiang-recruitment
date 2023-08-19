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
import { Account } from "src/account/entities/account.entity";
import { Authority } from "src/authority/entities/authority.entity";

/**
 * AuthorityGroup
 */
@Entity()
export class AuthorityGroup {
  /**
   * 用户列表
   */
  @ManyToMany(() => Account, (account) => account.authorityGroups)
  accounts: Account[];
  /**
   * 权限列表
   */
  @ManyToMany(() => Authority, (authority) => authority.authorityGroups, {
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
   * 权限组ID
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
}
