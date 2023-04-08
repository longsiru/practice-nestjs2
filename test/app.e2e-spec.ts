import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { title } from 'process';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    //所以很重要的一点是，在测试中，一定要应用真实的application环境。
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true, //如果设置为true，它会过滤掉任何没有装饰器的属性对象。这意味着，被我黑掉的热无法联系到我们的验证器
        forbidNonWhitelisted: true, //If set to true, instead of stripping non-whitelisted properties validator will throw an error
        transform: true, //接收和传递类型是会自动转换类型。
      }),
    );
    await app.init();
  });

  //在测试对url的请求，关于controller，service，pipe，意味着做所有的测试。
  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('welcome to my movie api!'); //pass
  });

  describe('/movies', () => {
    //在做测试时一般有两个数据库，一个适用于测试，一个是日常使用的。
    it('GET', () => {
      return request(app.getHttpServer()).get('/movies').expect(200).expect([]);
      //.expect([{ id: 1 }]) //一开始就是空的数据库，所以te使它failed
    });

    it('POST 201', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({
          title: 'Test',
          year: 2000,
          genres: ['test'],
        })
        .expect(201); //pass
    });

    it('POST 400', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({
          title: 'Test',
          year: 2000,
          genres: ['test'],
          other: 'thing,',
        })
        .expect(400); //pass
    });

    it('DELETE', () => {
      return request(app.getHttpServer()).delete('/movies').expect(404); //pass
    });
  });

  //这里将测试get，delete，patch，nestjs有一个函数function--it.todo()
  //我们不想创建新的应用程序（appliction），因此在测试开始之前，现创建一个新的application
  //change befoeEach to beforeAll()
  describe('/movies/:id', () => {});
  //然后更改code
  // it.todo('GET');
  // it.todo('DELETE');
  // it.todo('PATCH');
  it('GET 200', () => {
    return request(app.getHttpServer()).get('/movies/1').expect(200); //我们在上面创建了一个movie  send（），所以我们知道这里有个id=1 //但是在test里面ID是string，因为URL是string，在service里面是number。为什么会不一样呢？---因为我们在test里面新创建了applicatipn，但是我们没有把它放到任何pipe上。//所以很重要的一点是，在测试中，一定要应用真实的application环境。
  });
  it('GET 404', () => {
    return request(app.getHttpServer()).get('/movies/999').expect(404); //我们在上面创建了一个movie  send（），所以我们知道这里有个id=1 //但是在test里面ID是string，因为URL是string，在service里面是number。为什么会不一样呢？---因为我们在test里面新创建了applicatipn，但是我们没有把它放到任何pipe上。//所以很重要的一点是，在测试中，一定要应用真实的application环境。
  });

  it('PATCH 200', () => {
    return request(app.getHttpServer())
      .patch('/movies/1')
      .send({ title: 'Update Test' })
      .expect(200);
  });

  it('DELETE', () => {
    return request(app.getHttpServer()).delete('/movies/1').expect(200);
  });
});
