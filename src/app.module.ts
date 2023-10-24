import { Module, ClassSerializerInterceptor } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { getMetadataArgsStorage } from 'typeorm';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth/constants';
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'travel-note-database.ci8kfq4isrht.ap-northeast-2.rds.amazonaws.com',
      port: 3306,
      username: 'root',
      password: process.env.DATABASE_PASSWORD,
      database: 'travel',
      entities: getMetadataArgsStorage().tables.map((tbl) => tbl.target),
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: ClassSerializerInterceptor },
    AppService,
  ],
})
export class AppModule {}
