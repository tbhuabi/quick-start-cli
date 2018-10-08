import { Module, HttpModule } from '@nestjs/common';

import { StaticService } from './controllers/static/static.service';
import { StaticController } from './controllers/static/static.controller';

@Module({
  imports: [
    HttpModule
  ],
  controllers: [
    StaticController
  ],
  providers: [
    StaticService,
  ]
})
export class AppModule {
}
