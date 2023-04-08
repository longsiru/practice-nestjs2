import { Module } from '@nestjs/common';

import { MoviesModule } from './movies/movies.module';
import { AppController } from './app.controller';

//app.module.ts只能有AppController，AppService,所以现在我们要整理。--nest g mo
//在movies。moduel有一个有controller和service的module，然后用import导入appmdule
//那我们什么时候用appmodule？ ---- 首先我们重新创建controller---nest g co
@Module({
  imports: [MoviesModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
