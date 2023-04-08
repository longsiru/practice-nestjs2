import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { Module } from '@nestjs/common';
//刚创建的话是空的，这是我们要编辑appmodule
@Module({
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule {}
