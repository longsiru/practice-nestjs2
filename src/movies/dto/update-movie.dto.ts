//DTO代表数据传输对象。
//在这里做一个class type 回到controller的update，将updateData的类型设置为updateMovieDTO，也可以将这个类提供给service。再到service的update,将movieData的类型设置为updateMovieDTO，
//为什么要用dto---1.帮助程序员的代码更加简洁。  2.它允许nestjs验证输入的查询

import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsString } from 'class-validator';
import { CreateMovieDTO } from './create-movie.dto';
//设置为redonly但是不是必须要输入的项目。
////可以不这么做，可以使用部分类型（nestjs最棒的功能之一）。
// export class UpdateMovieDTO {
//   //   @IsString() //检查title是不是string类型
//   //   readonly title?: string;
//   //   @IsNumber()
//   //   readonly year?: number;
//   //   @IsString({ each: true }) //因为是数组所以{each: true}
//   //   readonly genres?: string[];
// }

//PartialType()需要安装--npm i @nestjs/mapped-types :   mapped-types  是一个转换类型并使它们可用的package。PartialType()需要基础类型--PartialType(CreateMovieDto)
export class UpdateMovieDTO extends PartialType(CreateMovieDTO) {}
