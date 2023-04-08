import { Controller, Get } from '@nestjs/common';

@Controller('movies')
export class MoviesController {
  @Get()
  getAll() {
    return 'This will return all movies!';
  }
  //需要什么，必须ask什么。
  @Get('/:id')
  getOne() {
    return 'This will return one movies!';
  }
}
