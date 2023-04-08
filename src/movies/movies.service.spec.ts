import { NotFoundException } from '@nestjs/common';
//.spec.ts包含测试的文件。
//例如这是MoviesService的测试文件。
//在nestjs，jest正在查看.spec.ts包文件，它的设置就是为了让我们可以找到.spec.ts。
//比如我现在要查看test：cov，然后告诉我们代码经过了多少测试。
//test:e2e--测试所有系统，测试整个页面。
//每个funcition单独测试叫测试单元。
//我们将用单元测试来测试movies service

//开始测试1.describe
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

//1.describe
describe('MoviesService', () => {
  let service: MoviesService;

  //2.beforeEach在test之前运行。
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  //3.以下是测试部分
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  //4.写第一个测试,第一我们要定义，第二要测试的部分创建一个函数来测试
  // it('should be 4', () => {
  //   //第三在这里写下测试需要的条件
  //   //expect(2 + 2).toEqual(4); //pass：console:should be 4 (2 ms)
  //   //expect(2 + 2).toEqual(5); // Expected: 5 || Received: 4
  //   expect(2 + 3).toEqual(5); //pass：console:should be 4 (2 ms)
  // });

  //first unit test : test getAll,不需要是同样的名字
  describe('getAll', () => {
    it('should be an array', () => {
      const result = service.getAll();
      //期待（expect）将包含结果（result）。
      expect(result).toBeInstanceOf(Array); //test pass
    });
  });

  //test getOne,如果在测试getOne时没有创建movie，则会出现问题。
  describe('getOne', () => {
    it('should return a movie', () => {
      service.creacte({
        title: 'test movie',
        genres: ['test'],
        year: 2000,
      });
      const movie = service.getOne(1);

      expect(movie).toBeDefined(); //pass
      expect(movie.id).toEqual(1); //pass
    });

    it('should throw 404 error', () => {
      try {
        service.getOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException); //pass
      }
    });
  });
});
