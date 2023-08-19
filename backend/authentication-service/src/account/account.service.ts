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
import { AuthorityGroup } from "src/authority-group/entities/authority-group.entity";
import { BcryptService } from "src/bcrypt.module";
import { AccountType, CreateAccountDto } from "./dto/create-account.dto";
import { UpdateAccountDto } from "./dto/update-account.dto";
import { Account } from "./entities/account.entity";

const STATIC_FULL_ID = {
  advertiser: null,
  applicant: null,
  manager: null,
  personnel: null,
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
    ]?.toLowerCase() as keyof typeof STATIC_FULL_ID;

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
    const authorityGroup: AuthorityGroup = (
      await this.serviceClient.authenticationAuthorityGroup.queryAuthorityGroup(
        {
          query: {
            name: ["$eq", accountTypeStr],
          },
        }
      )
    ).items[0] as unknown as AuthorityGroup;

    // 创建账号详细信息
    switch (accountType) {
      case AccountType.Manager:
        detailId = "manager";
        break;
      case AccountType.Applicant:
        detailId = (
          await this.serviceClient.applicant.addApplicant({
            requestBody: {
              ...detail,
              avatarUrl:
                (detail as Applicant)?.avatarUrl ||
                "/common-avatars/applicant.png",
            } as Applicant,
          })
        ).id;
        break;
      case AccountType.Personnel:
        detailId = (
          await this.serviceClient.personnel.addPersonnel({
            requestBody: {
              ...detail,
              avatarUrl:
                (detail as Personnel)?.avatarUrl ||
                "/common-avatars/personnel.png",
            } as Personnel,
          })
        ).id;
        break;
      case AccountType.Advertiser:
        detailId = (
          await this.serviceClient.advertiser.addAdvertiser({
            requestBody: {
              ...detail,
              logoUrl:
                (detail as Advertiser)?.logoUrl ||
                "/common-avatars/advertiser.png",
            } as Advertiser,
          })
        ).id;
        break;
    }

    // 创建账号
    return await this.accountRepository.save({
      ...accounts[0],
      userName,
      password: await this.bcryptService.hash(password),
      authorities: [
        ...(accounts[0]?.authorities || []),
        ...(createAccountDto.authorities || []),
      ].filter(Boolean),
      authorityGroups: [
        ...(accounts[0]?.authorityGroups || []),
        ...(createAccountDto.authorityGroups || []),
        authorityGroup,
      ].filter(Boolean),
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
      password: updateAccountDto.password
        ? await this.bcryptService.hash(updateAccountDto.password)
        : undefined,
      id,
    };
    const newAccount = await this.accountRepository.save(account);
    if (!newAccount) throw new NotFoundException();
    return newAccount;
  }

  async remove(id: string) {
    const { affected } = await this.accountRepository.softDelete(id);
    if (!affected) throw new NotFoundException();
    return id;
  }
}
