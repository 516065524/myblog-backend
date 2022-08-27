import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { HttpExecptionFilter } from './filters/http-execption.filter';
import { TransformInterceptor } from './interceptor/transform.interceptor';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new HttpExecptionFilter());

  const options = new DocumentBuilder()
    .setTitle('blog-serve')
    .setDescription('接口文档')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger-doc', app, document);
  await app.listen(3000);
}
bootstrap();
