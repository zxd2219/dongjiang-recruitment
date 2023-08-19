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
import { Company } from "src/company/entities/company.entity";
import { Personnel } from "src/external.entity";

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
