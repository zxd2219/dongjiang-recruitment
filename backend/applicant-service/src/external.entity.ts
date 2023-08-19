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

/**
 * Personnel
 */
@Entity()
export class Personnel {
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
   * 电子邮箱
   */
  @Column({
    nullable: true,
  })
  acceptEmail: string;
  /**
   * 头像地址
   */
  @Column({
    nullable: true,
  })
  avatarUrl: string;
  /**
   * 公司
   */
  @ManyToOne(() => Company, (company) => company.id, {
    eager: true,
  })
  @JoinColumn()
  company: Company;
  /**
   * 人事姓名
   */
  @Column({
    nullable: true,
  })
  hrName: string;
  /**
   * 职位名称
   */
  @Column({
    nullable: true,
  })
  postName: string;
}

/**
 * 面试
 */
export class InterviewInfo {
  /**
   * 面试说明，{1:可周末面试,2:包含笔试,3:可下班面试,4:包含面试作业}
   */
  illustrate: number;
  /**
   * 面试形式，{1:现场面试,2:视频面试,3:电话面试}
   */
  situation: number;
  /**
   * 面试时长，{1:一天内完成,2:分多次完成}
   */
  time: number;
  /**
   * 面试轮数，{1:1-2轮次,2:3-4轮次,3:5-6轮次,4:暂不确定}
   */
  wheel: number;
}

/**
 * 上班地点
 */
export class WorkingPlace {
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
 * Position
 */
@Entity()
export class Position {
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
   * 上限薪资，单位K
   */
  @Column({
    nullable: true,
  })
  ceilingSalary: number;
  /**
   * 公司
   */
  @ManyToOne(() => Company, (company) => company.id, {
    eager: true,
  })
  @JoinColumn()
  company: Company;
  /**
   * 所属部门
   */
  @Column({
    nullable: true,
  })
  departmentName: string;
  /**
   * 职位描述
   */
  @Column({
    nullable: true,
  })
  description: string;
  /**
   * 细分标签
   */
  @Column("simple-array", {
    nullable: true,
  })
  directionTags: string[];
  /**
   * 学历要求，{1:不要求,2:大专,3:本科,4:硕士,5:博士}
   */
  @Column({
    nullable: true,
  })
  education: number;
  /**
   * 职位亮点
   */
  @Column("simple-array", {
    nullable: true,
  })
  highlights: string[];
  /**
   * 面试
   */
  @Column("simple-json", {
    nullable: true,
  })
  interviewInfo: InterviewInfo;
  /**
   * 下班时间
   */
  @Column({
    nullable: true,
  })
  overTime: string;
  /**
   * 人事
   */
  @ManyToOne(() => Personnel, (personnel) => personnel.id, {
    eager: true,
  })
  @JoinColumn()
  personnel: Personnel;
  /**
   * 职位名称
   */
  @Column({
    nullable: true,
  })
  positionName: string;
  /**
   * 职位类型
   */
  @Column({
    nullable: true,
  })
  positionType: string;
  /**
   * 起始薪资，单位K
   */
  @Column({
    nullable: true,
  })
  startingSalary: number;
  /**
   * 周末休息时间，{1:周末双休:,2:周末单休,3:大小周}
   */
  @Column({
    nullable: true,
  })
  weekendReleaseTime: number;
  /**
   * 工作地区
   */
  @Column({
    nullable: true,
  })
  workAreaName: string;
  /**
   * 工作城市
   */
  @Column({
    nullable: true,
  })
  workCityName: string;
  /**
   * 上班地点
   */
  @Column("simple-json")
  workingPlace: WorkingPlace;
  /**
   * 工作年限，{1:经验不限,2:在校/应届,3:3年及以下,4:3-5年,5:5-10年,6:10年以上}
   */
  @Column({
    nullable: true,
  })
  workingYears: number;
  /**
   * 工作省份
   */
  @Column({
    nullable: true,
  })
  workProvinceName: string;
  /**
   * 上班时间
   */
  @Column({
    nullable: true,
  })
  workTime: string;
  /**
   * 职位类型，{1:全职,2:兼职,3:实习}
   */
  @Column({
    nullable: true,
  })
  workType: number;
}
