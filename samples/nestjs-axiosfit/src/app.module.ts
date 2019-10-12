import { Module, Logger } from '@nestjs/common';

import { ConfigModule } from './config/config.module';

import { AppController } from './app.controller';
import { BugService } from './shared/bug.service';

@Module({
  imports: [ConfigModule],
  controllers: [AppController],
  providers: [Logger, BugService],
})
export class AppModule {}
