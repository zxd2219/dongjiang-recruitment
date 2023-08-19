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
import { Advertiser } from "src/advertiser/entities/advertiser.entity";

export enum AdvertisePosition {
  /**
   * 主页
   */
  Master = 1,
  /**
   * 推广页
   */
  Popularize = 2,
}
export enum AdvertiseStatus {
  /**
   * 活动中
   */
  Active = 1,
  /**
   * 已过期
   */
  Expired = 2,
}

/**
 * Advertise
 */
@Entity()
export class Advertise {
  /**
   * 图片地址
   */
  @Column({
    nullable: true,
  })
  banner: string;
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
   * 结束时间
   */
  @Column({
    nullable: true,
  })
  endTime: Date;
  /**
   * 广告ID
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
   * 网页地址
   */
  @Column({
    nullable: true,
  })
  pageUrl: string;
  /**
   * 已缴费用
   */
  @Column({
    nullable: true,
  })
  payed: number;
  /**
   * 投放位置，{1:Master}
   */
  @Column({
    type: "enum",
    nullable: true,
    enum: AdvertisePosition,
  })
  position: AdvertisePosition;
  /**
   * 开始时间
   */
  @Column({
    nullable: true,
  })
  startTime: Date;
  /**
   * 投放状态，{1:Active,2:Expired}
   */
  @Column({
    type: "enum",
    nullable: true,
    enum: AdvertiseStatus,
  })
  status: AdvertiseStatus;
  /**
   * 修改时间
   */
  @UpdateDateColumn()
  updatedAt: Date;
  /**
   * 广告商
   */
  @ManyToOne(() => Advertiser, (advertiser) => advertiser.id, {
    eager: true,
  })
  @JoinColumn()
  advertiser: Advertiser;
}
