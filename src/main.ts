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
        maxAge: 6000000, 
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production',
        sameSite:"none"
      },
    }),
  );
  

  app.use(passport.initialize());
  app.use(passport.session());

  app.enableCors({
    origin: (origin,callback)=>{
      console.log("origin from:- ",origin)
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
  });


  await app.listen(3000);
}
bootstrap();
