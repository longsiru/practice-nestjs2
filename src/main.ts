import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //ValidationPipe()有很多好的地方，其中一个是白名单（whitelist）
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //如果设置为true，它会过滤掉任何没有装饰器的属性对象。这意味着，被我黑掉的热无法联系到我们的验证器
      forbidNonWhitelisted: true, //If set to true, instead of stripping non-whitelisted properties validator will throw an error
      transform: true, //接收和传递类型是会自动转换类型。
    }),
  ); //要安装npm i class-validator class-transformer，因为我么要做验证类（class），然后去dto

  await app.listen(3000);
}
bootstrap();
