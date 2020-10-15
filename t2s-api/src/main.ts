import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { json, urlencoded } from 'express';
import { join } from 'path';

async function bootstrap() {

  
  const appOptions = {cors: true};
  const app = await NestFactory.create<NestExpressApplication>(AppModule, appOptions);


  // To set globalPrefix for all API's 
  app.setGlobalPrefix('api'); 

  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));
  
  // To enable cors origin 
  app.enableCors();  

  console.log('bootstrap -> __dirname', __dirname);
  app.useStaticAssets(join(__dirname, '..', 'public'));

  // To configure swagger UI 
  const options = new DocumentBuilder()
  .setTitle('T2S Api ')
  .setDescription('T2S API description')
  .setVersion('1.0')
  .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);


  console.log('Your port is ', process.env.ENV);
  console.log('Your APP_URL is ', process.env.APP_URL);

  process.env.BASE_PATH = __dirname;
  console.log('bootstrap -> process.env.BASE_PATH', process.env.BASE_PATH);

  await app.listen(process.env.PORT);

}
bootstrap();
