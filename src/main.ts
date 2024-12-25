import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();

  const app = await NestFactory.create(AppModule);

  app.use(
    session({
      secret: process.env.SESSION_SECRET || 'default-secret', 
      resave: false, 
      saveUninitialized: false, 
      cookie: {
        maxAge: 600000, 
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production', 
      },
    }),
  );
  

  app.use(passport.initialize());
  app.use(passport.session());

  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true, 
  });


  await app.listen(3000);
}
bootstrap();
