//DTO代表数据传输对象。
//在这里做一个class type 回到controller的create，将movieData的类型设置为CreateMovieDTO，也可以将这个类提供给service。再到service的create,将movieData的类型设置为CreateMovieDTO，
//为什么要用dto---1.帮助程序员的代码更加简洁。  2.它允许nestjs验证输入的查询

import { IsNumber, IsOptional, IsString } from 'class-validator';

//然后我们要去main做一个管道。pipe，是我们代码要去的地方。现在我们需要创建一个用于验证的管道。通常可以将pipe视为类似中间件的东西。
export class CreateMovieDTO {
  @IsString() //检查title是不是string类型
  readonly title: string;

  @IsNumber()
  readonly year: number;

  @IsOptional()
  @IsString({ each: true }) //因为是数组所以{each: true}
  readonly genres: string[];
}
