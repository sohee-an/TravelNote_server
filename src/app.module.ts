import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { getMetadataArgsStorage } from 'typeorm';
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
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
