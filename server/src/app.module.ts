import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: "mysql",
    host: "localhost",
    username: "root",
    password: "",
    database: "shop",
    entities: [User],
    synchronize: true
  }), AuthModule]
})
export class AppModule { }