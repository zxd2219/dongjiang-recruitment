import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "@dongjiang-recruitment/nest-common/dist/typeorm";

/**
 * AuthorityGroup
 */
@Entity()
export class AuthorityGroup {
  /**
   * 权限列表
   */
  @Column("simple-json")
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
   * 权限组ID
   */
  @PrimaryGeneratedColumn("uuid")
  id: string;
  /**
   * 名称
   */
  @Column()
  name: string;
  /**
   * 修改时间
   */
  @UpdateDateColumn()
  updatedAt: Date;
}
