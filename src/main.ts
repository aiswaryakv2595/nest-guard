import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
//import * as session from 'express-session';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.use(session({
  //   secret: 'keyboard cat',
  //   resave: false,
  //   saveUninitialized: false,
  //   cookie: { httpOnly:true, secure: true }
  // }))
  await app.listen(3000);
}
bootstrap();
