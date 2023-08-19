import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "@dongjiang-recruitment/nest-common/dist/typeorm";

/**
 * Advertiser
 */
@Entity()
export class Advertiser {
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
   * 广告商ID
   */
  @PrimaryGeneratedColumn("uuid")
  id: string;
  /**
   * Logo地址
   */
  @Column({
    nullable: true,
  })
  logoUrl: string;
  /**
   * 名称
   */
  @Column({
    nullable: true,
  })
  name: string;
  /**
   * 网页地址
   */
  @Column({
    nullable: true,
  })
  pageUrl: string;
  /**
   * 修改时间
   */
  @UpdateDateColumn()
  updatedAt: Date;
}
