import { TypeOrmModule } from "@dongjiang-recruitment/nest-common/dist/typeorm";
import { Module } from "@nestjs/common";
import { AttentionRecordController } from "./attentionRecord.controller";
import { AttentionRecordService } from "./attentionRecord.service";
import { AttentionRecord } from "./entities/attentionRecord.entity";

@Module({
  imports: [TypeOrmModule.forFeature([AttentionRecord])],
  controllers: [AttentionRecordController],
  providers: [AttentionRecordService],
})
export class AttentionRecordModule {}
