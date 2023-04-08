import { CreateMovieDTO } from './dto/create-movie.dto';
import { Movie } from './entites/movie.entity';
//要创建一个数据库，service将处理查询之类的业务。
import { Body, Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class MoviesService {
  private movies: Movie[] = []; //我们需要格式化movie，假设movies的类型是数组，

  getAll(): Movie[] {
    return this.movies;
  }

  getOne(id: number): Movie {
    //return this.movies.find((movie) => movie.id === parseInt(id)); //这样转换id，因为最开始我们设置ID为number，但是现在我们用的是字符串来接受ID，所以在在最后要修复string类型id为number id。 转换方式了：parseInt(id)==+id两种写法。
    //有一个问题是，如果有人查找了一个不存在的电影我们需要告诉他不存在。--->
    const movie = this.movies.find((movie) => movie.id === id);
    if (!movie) {
      throw new NotFoundException(`Not found movie id ${id} not found.`);
    }
    return movie;
  }

  deleteOne(id: number) {
    //this.movies.filter((movie) => movie.id !== +id);//未完善前code,需要return---boolean    return true;
    this.getOne(id);
    this.movies = this.movies.filter((movie) => movie.id !== id);
  }

  creacte(movieData: CreateMovieDTO) {
    this.movies.push({
      id: this.movies.length + 1,
      ...movieData,
    });
  }
  //此时我们没有开启验证，任何entuty意外的内容也可以被添加。所以要开启验证。加@body.然后我们添加dto，DTO代表数据传输对象。
  update(id: number, @Body() updateData) {
    const movie = this.getOne(id); //先get一个movie，id为1，导入movie
    this.deleteOne(id); //然后删除movie
    this.movies.push({
      //然后向旧数据添加新数据来create new movie。
      ...movie,
      ...updateData,
    });
  }
}
