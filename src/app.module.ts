import {
  Module,
  ClassSerializerInterceptor,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
// import { AuthModule } from './auth/auth.module';
// import { UsersModule } from './users/users.module';
// import { getMetadataArgsStorage } from 'typeorm';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AuthTokenMiddleware } from './middleware/authToken.middleware';
// import { TripModule } from './trip/trip.module';

import {
  DATABASE_HOST,
  DATABASE_PASSWORD,
  DATABASE_PORT,
} from 'env-keys.const';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
      ignoreEnvFile: process.env.NODE_ENV === 'production',
      isGlobal: true,
    }),
    // TypeOrmModule.forRoot(),
    // TypeOrmModule.forRootAsync({
    //   inject: [ConfigService],
    //   useFactory: (config: ConfigService) => {
    //     return {
    //       type: 'mysql',
    //       host: config.get<string>(DATABASE_HOST),
    //       port: parseInt(config.get<string>(DATABASE_PORT)),
    //       username: 'root',
    //       password: config.get<string>(DATABASE_PASSWORD),
    //       database: 'travel',
    //       entities: getMetadataArgsStorage().tables.map((tbl) => tbl.target),
    //       autoLoadEntities: true,
    //       synchronize: true,
    //     };
    //   },
    // }),

    // UsersModule,
    // TripModule,
    // AuthModule,
  ],
  controllers: [AppController],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: ClassSerializerInterceptor }, //공통 인터셉터
    AppService,
  ],
})
export class AppModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer
  //     .apply(AuthTokenMiddleware)
  //     .forRoutes({ path: '*', method: RequestMethod.ALL });
  // }
}
