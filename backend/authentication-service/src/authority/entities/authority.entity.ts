import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "@dongjiang-recruitment/nest-common/dist/typeorm";
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
  @Column()
  name: string;
  /**
   * 修改时间
   */
  @UpdateDateColumn()
  updatedAt: Date;
}
