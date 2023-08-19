import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "@dongjiang-recruitment/nest-common/dist/typeorm";

/**
 * Applicant
 */
@Entity()
export class Applicant {
  /**
   * 求职者ID
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
   * 年龄
   */
  @Column({
    nullable: true,
  })
  age: number;
  /**
   * 头像地址
   */
  @Column({
    nullable: true,
  })
  avatarUrl: string;
  /**
   * 所在城市
   */
  @Column({
    nullable: true,
  })
  cityName: string;
  /**
   * 生日
   */
  @Column({
    nullable: true,
  })
  dateOfBirth: string;
  /**
   * 学历状态，{0:未知,1:大专,2:本科,3:硕士,4:博士}
   */
  @Column({
    nullable: true,
  })
  education: number;
  /**
   * 电子邮箱
   */
  @Column({
    nullable: true,
  })
  email: string;
  /**
   * 姓
   */
  @Column({
    nullable: true,
  })
  firstName: string;
  /**
   * 求职状态，{1:随时入职,2:2周内入职,3:1月内入职}
   */
  @Column({
    nullable: true,
  })
  jobStatus: number;
  /**
   * 名
   */
  @Column({
    nullable: true,
  })
  lastName: string;
  /**
   * 个人优势
   */
  @Column({
    nullable: true,
  })
  personalAdvantage: string;
  /**
   * 图片作品
   */
  @Column("simple-array", {
    nullable: true,
  })
  pictureWorks: string[];
  /**
   * 隐私设置，{1:实名,2:匿名}
   */
  @Column({
    nullable: true,
  })
  privacySettings: number;
  /**
   * 性别
   */
  @Column({
    nullable: true,
  })
  sex: string;
  /**
   * 社交主页
   */
  @Column({
    nullable: true,
  })
  socialHomepage: string;
  /**
   * 工作年限，{1:没有工作经验,2:在校/应届,3:3年一下,4:3-5年,5:5-10年,6:10年以上}
   */
  @Column({
    nullable: true,
  })
  workingYears: number;
}

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
