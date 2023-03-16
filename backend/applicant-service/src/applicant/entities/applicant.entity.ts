import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "@dongjiang-recruitment/nest-common/dist/typeorm";

export enum ApplicantEducation {
  /**
   * 未知
   */
  Unknown = 0,
  /**
   * 大专
   */
  JuniorCollege = 1,
  /**
   * 本科
   */
  Undergraduate = 2,
  /**
   * 硕士
   */
  Postgraduate = 3,
  /**
   * 博士
   */
  Doctor = 4,
}

export enum ApplicantJobStatus {
  /**
   * 未知
   */
  Unknown = 0,
  /**
   * 随时入职
   */
  AnyTime = 1,
  /**
   * 2周内入职
   */
  TwoWeeks = 2,
  /**
   * 1个月内入职
   */
  OneMoth = 3,
}

export enum ApplicantPrivacySettings {
  /**
   * 实名
   */
  RealName = 1,
  /**
   * 匿名
   */
  Anonymous = 2,
}

export enum ApplicantWorkExperience {
  /**
   * 没有工作经验
   */
  NoExperience = 1,
  /**
   * 在校/应届
   */
  InSchoolOrFreshGraduate = 2,
  /**
   * 3年以下
   */
  Under3Year = 3,
  /**
   * 3-5年
   */
  With3To5Year = 4,
  /**
   * 5-10年
   */
  With5To10Year = 5,
  /**
   * 10年以上
   */
  MoreThen10Year = 6,
}

/**
 * Applicant
 */
@Entity()
export class Applicant {
  /**
   * 年龄
   */
  @Column()
  age: number;
  /**
   * 头像地址
   */
  @Column()
  avatarUrl: string;
  /**
   * 所在城市
   */
  @Column()
  cityName: string;
  /**
   * 创建时间
   */
  @CreateDateColumn()
  createdAt: Date;
  /**
   * 生日
   */
  @Column()
  dateOfBirth: string;
  /**
   * 移除时间
   */
  @DeleteDateColumn()
  deletedAt: Date;
  /**
   * 学历状态，{0:未知,1:大专,2:本科,3:硕士,4:博士}
   */
  @Column({
    type: "enum",
    enum: ApplicantEducation,
  })
  education: ApplicantEducation;
  /**
   * 电子邮箱
   */
  @Column()
  email: string;
  /**
   * 姓
   */
  @Column()
  firstName: string;
  /**
   * 求职者ID
   */
  @PrimaryGeneratedColumn("uuid")
  id: string;
  /**
   * 求职状态，{1:随时入职,2:2周内入职,3:1月内入职}
   */
  @Column({
    type: "enum",
    enum: ApplicantJobStatus,
  })
  jobStatus: ApplicantJobStatus;
  /**
   * 名
   */
  @Column()
  lastName: string;
  /**
   * 个人优势
   */
  @Column()
  personalAdvantage: string;
  /**
   * 图片作品
   */
  @Column("simple-array")
  pictureWorks: string[];
  /**
   * 隐私设置，{1:实名,2:匿名}
   */
  @Column({
    type: "enum",
    enum: ApplicantPrivacySettings,
  })
  privacySettings: ApplicantPrivacySettings;
  /**
   * 性别
   */
  @Column()
  sex: string;
  /**
   * 社交主页
   */
  @Column()
  socialHomepage: string;
  /**
   * 更新时间
   */
  @UpdateDateColumn()
  updatedAt: Date;
  /**
   * 工作年限，{1:没有工作经验,2:在校/应届,3:3年一下,4:3-5年,5:5-10年,6:10年以上}
   */
  @Column()
  workingYears: number;
}
