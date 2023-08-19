import {
  ConfigType,
  alipayConfig as _alipayConfig,
  minioConfig as _minioConfig,
} from "@dongjiang-recruitment/nest-common/dist/config";
import {
  Areas,
  Cities,
  DirectionTags,
  FilterCriteria,
  PositionTypes,
  ServiceClient,
} from "@dongjiang-recruitment/nest-common/dist/http";
import { MailerService } from "@dongjiang-recruitment/nest-common/dist/mailer";
import { MinioService } from "@dongjiang-recruitment/nest-common/dist/minio";
import {
  Redis,
  RedisService,
} from "@dongjiang-recruitment/nest-common/dist/redis";
import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import Alipay from "alipay-sdk";
import { randomUUID } from "node:crypto";
import { extname } from "node:path";

@Injectable()
export class CommonService {
  private readonly redis: Redis;
  private readonly alipay: Alipay;

  constructor(
    private readonly minio: MinioService,
    @Inject(_minioConfig.KEY)
    private readonly minioConfig: ConfigType<typeof _minioConfig>,
    private readonly mailerService: MailerService,
    private readonly redisService: RedisService,
    private readonly serviceClient: ServiceClient,
    @Inject(_alipayConfig.KEY)
    alipayConfig: ConfigType<typeof _alipayConfig>
  ) {
    this.redis = this.redisService.getClient();
    this.alipay = new Alipay(alipayConfig);
  }

  getAreas(cityName: string): Areas {
    return [
      {
        countyName: "海淀区",
        areas: [
          "西北旺",
          "上地",
          "双榆树",
          "中关村",
          "五道口",
          "马连洼",
          "清河",
          "西二旗",
          "万泉河",
          "北下关",
          "西三旗",
          "杜丹园",
          "万柳",
          "学院路",
          "知春路",
          "苏州街",
        ],
      },
      {
        countyName: "朝阳区",
        areas: ["望京", "大山子", "来广营", "酒仙桥", "建外大街"],
      },
      { countyName: "东城区", areas: [] },
      { countyName: "西城区", areas: [] },
      { countyName: "大丰区", areas: [] },
      { countyName: "丰台区", areas: [] },
      { countyName: "昌平区", areas: [] },
      { countyName: "通州区", areas: [] },
    ];
  }

  getCities(): Cities {
    return [
      {
        provinceName: "北京",
        cities: [
          "海淀区",
          "东城区",
          "西城区",
          "朝阳区",
          "丰台区",
          "石景山区",
          "门头沟区",
          "房山区",
          "通州区",
          "顺义区",
          "昌平区",
          "大兴区",
          "怀柔区",
          "平谷区",
          "密云县",
          "延庆县",
        ],
      },
      {
        provinceName: "上海",
        cities: [
          "黄浦区",
          "卢湾区",
          "徐汇区",
          "长宁区",
          "静安区",
          "普陀区",
          "闸北区",
          "虹口区",
          "杨浦区",
          "闵行区",
          "宝山区",
          "嘉定区",
          "浦东新区",
          "金山区",
          "松江区",
          "青浦区",
          "南汇区",
          "奉贤区",
          "崇明县",
        ],
      },
      {
        provinceName: "广州",
        cities: [
          "荔湾区",
          "越秀区",
          "海珠区",
          "天河区",
          "白云区",
          "黄埔区",
          "番禺区",
          "花都区",
          "南沙区",
          "萝岗区",
          "增城市",
          "从化市",
        ],
      },
      {
        provinceName: "湖北",
        cities: [
          "武汉",
          "黄石",
          "十堰",
          "宜昌",
          "襄阳",
          "鄂州",
          "荆门",
          "孝感",
          "荆州",
          "黄冈",
          "咸宁",
          "随州",
          "恩施",
          "仙桃",
          "潜江",
          "天门",
          "神农架",
        ],
      },
      {
        provinceName: "湖南",
        cities: [
          "长沙",
          "株洲",
          "湘潭",
          "衡阳",
          "邵阳",
          "岳阳",
          "常德",
          "张家界",
          "益阳",
          "郴州",
          "永州",
          "怀化",
          "娄底",
          "湘西",
        ],
      },
      {
        provinceName: "广东",
        cities: [
          "广州",
          "韶关",
          "深圳",
          "珠海",
          "汕头",
          "佛山",
          "江门",
          "湛江",
          "茂名",
          "肇庆",
          "惠州",
          "梅州",
          "汕尾",
          "河源",
          "阳江",
          "清远",
          "东莞",
          "中山",
          "潮州",
          "揭阳",
          "云浮",
        ],
      },
      {
        provinceName: "广西",
        cities: [
          "南宁",
          "柳州",
          "桂林",
          "梧州",
          "北海",
          "防城港",
          "钦州",
          "贵港",
          "玉林",
          "百色",
          "贺州",
          "河池",
          "来宾",
          "崇左",
        ],
      },
      {
        provinceName: "海南",
        cities: [
          "海口",
          "三亚",
          "五指山",
          "琼海",
          "儋州",
          "文昌",
          "万宁",
          "东方",
          "定安",
          "屯昌",
          "澄迈",
          "临高",
          "白沙",
          "昌江",
          "乐东",
          "陵水",
          "保亭",
          "琼中",
        ],
      },
      {
        provinceName: "四川",
        cities: [
          "成都",
          "自贡",
          "攀枝花",
          "泸州",
          "德阳",
          "绵阳",
          "广元",
          "遂宁",
          "内江",
          "乐山",
          "南充",
          "眉山",
          "宜宾",
          "广安",
          "达州",
          "雅安",
          "巴中",
          "资阳",
          "阿坝",
          "甘孜",
          "凉山",
        ],
      },
      {
        provinceName: "贵州",
        cities: [
          "贵阳",
          "六盘水",
          "遵义",
          "安顺",
          "铜仁",
          "黔西南",
          "毕节",
          "黔东南",
          "黔南",
        ],
      },
      {
        provinceName: "云南",
        cities: [
          "昆明",
          "曲靖",
          "玉溪",
          "保山",
          "昭通",
          "丽江",
          "普洱",
          "临沧",
          "楚雄",
          "红河",
          "文山",
          "西双版纳",
          "大理",
          "德宏",
          "怒江",
          "迪庆",
        ],
      },
      {
        provinceName: "西藏",
        cities: ["拉萨", "昌都", "山南", "日喀则", "那曲", "阿里", "林芝"],
      },
      {
        provinceName: "陕西",
        cities: [
          "西安",
          "铜川",
          "宝鸡",
          "咸阳",
          "渭南",
          "延安",
          "汉中",
          "榆林",
          "安康",
          "商洛",
        ],
      },
      {
        provinceName: "甘肃",
        cities: [
          "兰州",
          "嘉峪关",
          "金昌",
          "白银",
          "天水",
          "武威",
          "张掖",
          "平凉",
          "酒泉",
          "庆阳",
          "定西",
          "陇南",
          "临夏",
          "甘南",
        ],
      },
      {
        provinceName: "青海",
        cities: [
          "西宁",
          "海东",
          "海北",
          "黄南",
          "海南",
          "果洛",
          "玉树",
          "海西",
        ],
      },
      {
        provinceName: "宁夏",
        cities: ["银川", "石嘴山", "吴忠", "固原", "中卫"],
      },
      {
        provinceName: "新疆",
        cities: [
          "乌鲁木齐",
          "克拉玛依",
          "吐鲁番",
          "哈密",
          "昌吉",
          "博尔塔拉",
          "巴音郭楞",
          "阿克苏",
          "克孜勒苏",
          "喀什",
          "和田",
          "伊犁",
          "塔城",
          "阿勒泰",
        ],
      },
      { provinceName: "香港", cities: ["香港"] },
      { provinceName: "澳门", cities: ["澳门"] },
      {
        provinceName: "台湾",
        cities: ["台湾"],
      },
    ];
  }

  getFilterCriteria(): FilterCriteria {
    return {
      companySize: [
        "少于15人",
        "15-50人",
        "50-150人",
        "150-500人",
        "500-2000人",
        "2000以上",
      ],
      education: ["不要求", "大专", "本科", "硕士", "博士"],
      expectedSalary: [
        "2000以下",
        "2000-3000",
        "3000-4000",
        "4000-5000",
        "5000-6000",
      ],
      financingStage: [
        "未融资",
        "天使轮",
        "A轮",
        "B轮",
        "C轮",
        "D轮及以上",
        "上市公司",
        "不需要融资",
      ],
      industryField: [
        "技术|测试|运维",
        "产品|运营|策划",
        "艺术|设计",
        "数据|BI|用研",
        "游戏",
      ],
      natureWork: ["全职", "兼职", "实习"],
      occupationalBreakdown: [
        "计算机软件",
        "计算机硬件",
        "计算机网络",
        "计算机系统集成",
        "计算机应用技术",
        "计算机网络技术",
      ],
      workExperience: [
        "经验不限",
        "在校/应届",
        "3年及以下",
        "3-5年",
        "5-10年",
        "10年以上",
      ],
    };
  }

  getPositionTypes(): PositionTypes {
    return [
      {
        fieldName: "技术|测试|运维",
        directions: [
          {
            directionName: "技术开发",
            positions: [
              "JAVA工程师",
              "后端工程师",
              "前端工程师",
              "移动端工程师",
              "软件工程师",
              "全栈工程师",
              "算法工程师",
              "大数据开发工程师",
              "嵌入式软件工程师",
              "架构师",
            ],
          },
          {
            directionName: "技术开发管理",
            positions: ["技术经理|主管", "技术总监", "CTO|CIO"],
          },
          {
            directionName: "测试",
            positions: ["测试工程师", "自动化测试", "测试开发"],
          },
          {
            directionName: "测试管理",
            positions: ["测试经理|主管", "测试总监"],
          },
          {
            directionName: "游戏开发|测试",
            positions: [],
          },
          {
            directionName: "运维|技术支持",
            positions: [],
          },
          {
            directionName: "运维|DBA管理",
            positions: [],
          },
        ],
      },
      {
        fieldName: "产品|运营|策划",
        directions: [],
      },
      {
        fieldName: "艺术|设计",
        directions: [],
      },
      {
        fieldName: "数据|BI|用研",
        directions: [],
      },
      {
        fieldName: "游戏",
        directions: [],
      },
    ];
  }

  getDirectionTags(): DirectionTags {
    return [
      {
        classificationName: "开发语言",
        subdivisionLabels: [
          "Java",
          "C语言",
          "C++",
          "C#",
          "PHP",
          "Python",
          "JavaScript",
          "TypeScript",
          "HTML",
          "CSS",
          "Objective-C",
          "Swift",
          "Go",
          "Ruby",
          "SQL",
          "Shell",
          "Perl",
          "R",
          "MATLAB",
          "VB",
          "Delphi",
          "Kotlin",
          "Scala",
          "Groovy",
          "Rust",
          "Erlang",
        ],
      },
      {
        classificationName: "开发框架",
        subdivisionLabels: [
          "VC",
          "VC++",
          "VC.Net",
          "STL",
          "Socket",
          ".NET",
          "WPF",
          "Django",
          "Flask",
          "Spring",
          "Struts",
          "Hibernate",
          "Node.js",
          "Express",
          "Spark",
        ],
      },
      {
        classificationName: "操作系统",
        subdivisionLabels: [
          "Linux",
          "Windows",
          "MacOS",
          "Android",
          "iOS",
          "Windows Phone",
          "Ubuntu",
          "CentOS",
          "Debian",
          "RedHat",
          "Oracle",
        ],
      },
      {
        classificationName: "数据库",
        subdivisionLabels: [
          "MySQL",
          "Oracle",
          "SQLite",
          "MongoDB",
          "Redis",
          "PostgreSQL",
          "MSSQL",
          "SQL Server",
          "HBase",
          "Cassandra",
          "Apache Hive",
          "Apache Drill",
        ],
      },
    ];
  }

  async sendRecommend(recommend: { userId: string; positionId: string }) {
    try {
      await this.serviceClient.loginAsAdmin();
      const applicant = await this.serviceClient.applicant.getApplicant({
        id: recommend.userId,
      });
      const position = await this.serviceClient.company.queryAllPosition({
        query: {
          id: ["$eq", recommend.positionId],
        },
      });
      if (!position.items.length) return "推荐职位不存在";
      await this.mailerService.sendMail({
        to: applicant.email,
        subject: "东江招聘 - 职位推荐",
        template: "recommend-job",
        context: {
          cid: position.items[0].company.id,
          pid: position.items[0].id,
          cname: position.items[0].company.companyName,
          pname: position.items[0].positionName,
        },
      });
      return "推荐职位发送成功";
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException("推荐职位发送失败");
    }
  }

  async getVerificationCode(email: string) {
    const code = Math.random().toString().slice(-6);
    await this.redis.set(`verification-code:${email}`, code, "EX", 60 * 60);
    try {
      await this.mailerService.sendMail({
        to: email,
        subject: "东江招聘 - 验证码",
        template: "verification-code",
        context: {
          email,
          code,
        },
      });
      return "验证码已发送";
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException("验证码发送失败");
    }
  }

  getNewVersion() {
    return "1.0.0";
  }

  async uploadFile(file: Express.Multer.File) {
    const fileNme = `${randomUUID()}${extname(file.originalname)}`;
    await this.minio.client.putObject(
      `${this.minioConfig.bucket}-files`,
      fileNme,
      file.buffer,
      file.size
    );
    return `/${this.minioConfig.bucket}-files/${fileNme}`;
  }

  async uploadAvatar(avatar: Express.Multer.File) {
    const avatarNme = `${randomUUID()}${extname(avatar.originalname)}`;
    await this.minio.client.putObject(
      `${this.minioConfig.bucket}-avatars`,
      avatarNme,
      avatar.buffer,
      avatar.size
    );
    return `/${this.minioConfig.bucket}-avatars/${avatarNme}`;
  }

  async payment(name: string, total: number) {
    const outTradeNo = randomUUID();
    return {
      outTradeNo,
      payUrl: this.alipay.pageExec("alipay.trade.page.pay", {
        method: "GET",
        bizContent: {
          outTradeNo: outTradeNo,
          productCode: "FAST_INSTANT_TRADE_PAY",
          totalAmount: total,
          subject: name,
        },
      }),
    };
  }

  async getPaymentStatus(outTradeNo: string) {
    const result = this.alipay.exec("alipay.trade.query", {
      bizContent: {
        outTradeNo,
      },
    });
    return result;
  }
}
