import { Pagination } from "@dongjiang-recruitment/nest-common/dist/decorator";
import {
  Advertiser,
  Applicant,
  Personnel,
  ServiceClient,
} from "@dongjiang-recruitment/nest-common/dist/http";
import {
  FindOptionsWhere,
  InjectRepository,
  Repository,
} from "@dongjiang-recruitment/nest-common/dist/typeorm";
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { BcryptService } from "src/bcrypt.module";
import { AccountType, CreateAccountDto } from "./dto/create-account.dto";
import { UpdateAccountDto } from "./dto/update-account.dto";
import { Account } from "./entities/account.entity";

const STATIC_FULL_ID = {
  manager: null,
  applicant: null,
  personnel: null,
  account: null,
};

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    private readonly serviceClient: ServiceClient,
    private readonly bcryptService: BcryptService
  ) {}

  async create(createAccountDto: CreateAccountDto) {
    const { accountType, userName, password, detail } = createAccountDto;

    // 获取账号类型对应的字段名
    const accountTypeStr = AccountType[
      accountType
    ].toLowerCase() as keyof typeof STATIC_FULL_ID;

    // 检查账号是否已存在
    const { items: accounts } = await this.findAll(
      [
        {
          userName,
        },
      ],
      { page: 0, size: 1, sort: {} }
    );
    if (accounts[0]?.detailId[accountTypeStr]) {
      throw new BadRequestException("账号已存在");
    }

    if (accountType !== AccountType.Manager) {
      await this.serviceClient.loginAsAdmin();
    }

    let detailId: string;
    // 创建账号详细信息
    switch (accountType) {
      case AccountType.Manager:
        detailId = "manager";
        break;
      case AccountType.Applicant:
        detailId = (
          await this.serviceClient.applicant.addApplicant({
            requestBody: detail as Applicant,
          })
        ).body.id;
        break;
      case AccountType.Personnel:
        detailId = (
          await this.serviceClient.personnel.addPersonnel({
            requestBody: detail as Personnel,
          })
        ).body.id;
        break;
      case AccountType.Advertiser:
        detailId = (
          await this.serviceClient.advertiser.addAdvertiser({
            requestBody: detail as Advertiser,
          })
        ).body.id;
        break;
    }

    // 创建账号
    return await this.accountRepository.save({
      ...accounts[0],
      userName,
      password: await this.bcryptService.hash(password),
      authorities: [...(accounts[0]?.authorities || [])],
      groups: [...(accounts[0]?.groups || []), accountTypeStr],
      detailId: {
        ...STATIC_FULL_ID,
        ...accounts[0]?.detailId,
        [accountTypeStr]: detailId,
      },
    });
  }

  async findAll(
    query: Array<FindOptionsWhere<Account>>,
    { page, size, sort }: Pagination<Account>
  ) {
    return {
      total: await this.accountRepository.count({
        where: query,
      }),
      items: await this.accountRepository.find({
        where: query,
        skip: page * size,
        take: size,
        order: sort,
      }),
    };
  }

  async findOne(id: string) {
    const account = await this.accountRepository.findOne({
      where: { id },
    });
    if (!account) throw new NotFoundException();
    return account;
  }

  async update(id: string, updateAccountDto: UpdateAccountDto) {
    const account: UpdateAccountDto = {
      ...updateAccountDto,
      password: await this.bcryptService.hash(updateAccountDto.password),
      id,
    };
    const { affected } = await this.accountRepository.update(id, account);
    if (!affected) throw new NotFoundException();
    return account;
  }

  async remove(id: string) {
    const { affected } = await this.accountRepository.softDelete(id);
    if (!affected) throw new NotFoundException();
    return id;
  }
}
