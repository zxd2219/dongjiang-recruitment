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
