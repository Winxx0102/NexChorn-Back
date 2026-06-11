import { Module } from '@nestjs/common';
import { ChroniclesService } from './chronicles.service';
import { ChroniclesController } from './chronicles.controller';

@Module({
  controllers: [ChroniclesController],
  providers: [ChroniclesService],
})
export class ChroniclesModule {}
