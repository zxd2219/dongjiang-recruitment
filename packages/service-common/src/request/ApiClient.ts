/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseHttpRequest } from "./core/BaseHttpRequest";
import type { OpenAPIConfig } from "./core/OpenAPI";
import { AxiosHttpRequest } from "./core/AxiosHttpRequest";

import { AdvertiserService } from "./services/AdvertiserService";
import { AdvertiserAdvertiseService } from "./services/AdvertiserAdvertiseService";
import { ApplicantService } from "./services/ApplicantService";
import { ApplicantAttentionRecordService } from "./services/ApplicantAttentionRecordService";
import { ApplicantDeliveryRecordService } from "./services/ApplicantDeliveryRecordService";
import { ApplicantEducationExperienceService } from "./services/ApplicantEducationExperienceService";
import { ApplicantGarnerRecordService } from "./services/ApplicantGarnerRecordService";
import { ApplicantInspectionRecordService } from "./services/ApplicantInspectionRecordService";
import { ApplicantJobExpectationService } from "./services/ApplicantJobExpectationService";
import { ApplicantProjectExperienceService } from "./services/ApplicantProjectExperienceService";
import { ApplicantWorkExperienceService } from "./services/ApplicantWorkExperienceService";
import { AuthenticationService } from "./services/AuthenticationService";
import { AuthenticationAccountService } from "./services/AuthenticationAccountService";
import { AuthenticationAuthorityService } from "./services/AuthenticationAuthorityService";
import { AuthenticationAuthorityGroupService } from "./services/AuthenticationAuthorityGroupService";
import { CommonService } from "./services/CommonService";
import { CompanyService } from "./services/CompanyService";
import { CompanyPositionService } from "./services/CompanyPositionService";
import { PersonnelService } from "./services/PersonnelService";
import { PersonnelInspectionRecordService } from "./services/PersonnelInspectionRecordService";

type HttpRequestConstructor = new (config: OpenAPIConfig) => BaseHttpRequest;

export class ApiClient {
  public readonly advertiser: AdvertiserService;
  public readonly advertiserAdvertise: AdvertiserAdvertiseService;
  public readonly applicant: ApplicantService;
  public readonly applicantAttentionRecord: ApplicantAttentionRecordService;
  public readonly applicantDeliveryRecord: ApplicantDeliveryRecordService;
  public readonly applicantEducationExperience: ApplicantEducationExperienceService;
  public readonly applicantGarnerRecord: ApplicantGarnerRecordService;
  public readonly applicantInspectionRecord: ApplicantInspectionRecordService;
  public readonly applicantJobExpectation: ApplicantJobExpectationService;
  public readonly applicantProjectExperience: ApplicantProjectExperienceService;
  public readonly applicantWorkExperience: ApplicantWorkExperienceService;
  public readonly authentication: AuthenticationService;
  public readonly authenticationAccount: AuthenticationAccountService;
  public readonly authenticationAuthority: AuthenticationAuthorityService;
  public readonly authenticationAuthorityGroup: AuthenticationAuthorityGroupService;
  public readonly common: CommonService;
  public readonly company: CompanyService;
  public readonly companyPosition: CompanyPositionService;
  public readonly personnel: PersonnelService;
  public readonly personnelInspectionRecord: PersonnelInspectionRecordService;

  public readonly request: BaseHttpRequest;

  constructor(
    config?: Partial<OpenAPIConfig>,
    HttpRequest: HttpRequestConstructor = AxiosHttpRequest
  ) {
    this.request = new HttpRequest({
      BASE: config?.BASE ?? "",
      VERSION: config?.VERSION ?? "1.0.0",
      WITH_CREDENTIALS: config?.WITH_CREDENTIALS ?? false,
      CREDENTIALS: config?.CREDENTIALS ?? "include",
      TOKEN: config?.TOKEN,
      USERNAME: config?.USERNAME,
      PASSWORD: config?.PASSWORD,
      HEADERS: config?.HEADERS,
      ENCODE_PATH: config?.ENCODE_PATH,
    });

    this.advertiser = new AdvertiserService(this.request);
    this.advertiserAdvertise = new AdvertiserAdvertiseService(this.request);
    this.applicant = new ApplicantService(this.request);
    this.applicantAttentionRecord = new ApplicantAttentionRecordService(
      this.request
    );
    this.applicantDeliveryRecord = new ApplicantDeliveryRecordService(
      this.request
    );
    this.applicantEducationExperience = new ApplicantEducationExperienceService(
      this.request
    );
    this.applicantGarnerRecord = new ApplicantGarnerRecordService(this.request);
    this.applicantInspectionRecord = new ApplicantInspectionRecordService(
      this.request
    );
    this.applicantJobExpectation = new ApplicantJobExpectationService(
      this.request
    );
    this.applicantProjectExperience = new ApplicantProjectExperienceService(
      this.request
    );
    this.applicantWorkExperience = new ApplicantWorkExperienceService(
      this.request
    );
    this.authentication = new AuthenticationService(this.request);
    this.authenticationAccount = new AuthenticationAccountService(this.request);
    this.authenticationAuthority = new AuthenticationAuthorityService(
      this.request
    );
    this.authenticationAuthorityGroup = new AuthenticationAuthorityGroupService(
      this.request
    );
    this.common = new CommonService(this.request);
    this.company = new CompanyService(this.request);
    this.companyPosition = new CompanyPositionService(this.request);
    this.personnel = new PersonnelService(this.request);
    this.personnelInspectionRecord = new PersonnelInspectionRecordService(
      this.request
    );
  }
}
