import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
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

    it('POST', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({
          title: 'Test',
          year: 2000,
          genres: ['test'],
        })
        .expect(201); //pass
    });

    it('DELETE', () => {
      return request(app.getHttpServer()).delete('/movies').expect(404); //pass
    });
  });
});
