import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  dotenv.config();

  const app = await NestFactory.create(AppModule);

  app.use(
    session({
      secret: process.env.SESSION_SECRET || 'default-secret', 
      resave: false, 
      saveUninitialized: false, 
      cookie: {
        maxAge: 6000000, 
        httpOnly: true, 
      },
    }),
  );
  

  app.use(passport.initialize());
  app.use(passport.session());

  app.enableCors({
    origin: (origin,callback)=>{
      if(!origin){
        return callback(null,true)
      }
      const allowed_origins = process.env.ALLOWED_ORIGIN
      if(allowed_origins.includes(origin)){
        return callback(null,true)
      }
      return callback(new Error("Not allowed by cors"))
    },
    credentials: true, 
    methods:'GET,POST,PUT,PATCH,DELETE,OPTIONS',
    allowedHeaders:'Content-Type,Authorization',
  });

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true, 
    transform: true,  
   }));

  const config = new DocumentBuilder()
  .setTitle('API Documentation')
  .setDescription('API endpoints for Url-Shortener')
  .setVersion('1.0')
  .addCookieAuth('connect.sid')
  .build();

const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}
bootstrap();
