import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "@dongjiang-recruitment/nest-common/dist/typeorm";

/**
 * 公司地点
 */
export class Location {
  /**
   * 纬度
   */
  latitude: number;
  /**
   * 经度
   */
  longitude: number;
}

/**
 * Company
 */
@Entity()
export class Company {
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
   * 扩展
   */
  @Column({
    nullable: true,
  })
  about: string;
  /**
   * 详细地址
   */
  @Column({
    nullable: true,
  })
  address: string;
  /**
   * 公司福利
   */
  @Column("simple-array", {
    nullable: true,
  })
  benefits: string[];
  /**
   * 所在城市
   */
  @Column({
    nullable: true,
  })
  cityName: string;
  /**
   * 公司名称
   */
  @Column({
    nullable: true,
  })
  companyName: string;
  /**
   * 领域名称
   */
  @Column({
    nullable: true,
  })
  comprehensionName: string;
  /**
   * 成立时间
   */
  @Column({
    nullable: true,
  })
  establishmentTime: Date;
  /**
   * 融资阶段，{1:未融资,2:天使轮,3:A轮,4:B轮,5:C轮,6:D轮及以上,7:上市公司,8:不需要融资}
   */
  @Column({
    nullable: true,
  })
  financingStage: number;
  /**
   * 公司全称
   */
  @Column({
    nullable: true,
  })
  fullName: string;
  /**
   * 法定代表人
   */
  @Column({
    nullable: true,
  })
  legalRepresentative: string;
  /**
   * 公司地点
   */
  @Column("simple-json", {
    nullable: true,
  })
  location: Location;
  /**
   * LOGO地址
   */
  @Column({
    nullable: true,
  })
  logoUrl: string;
  /**
   * 机构类型
   */
  @Column({
    nullable: true,
  })
  organizationType: string;
  /**
   * 在招职位
   */
  @Column({
    nullable: true,
  })
  recruitmentPosition: number;
  /**
   * 注册资本
   */
  @Column({
    nullable: true,
  })
  registeredCapital: string;
  /**
   * 公司规模，{1:少于15人,2:15-50人,3:50-150人,4:150-500人,5:500-2000人,6:2000以上}
   */
  @Column({
    nullable: true,
  })
  scale: number;
}
