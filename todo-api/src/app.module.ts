import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoEntity } from './Entity/todo.entity';
import { TodoModule } from './todo/todo.module';
import { AuthModule } from './auth/auth.module';


const ormOptions: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'Van4ha6093@',
  database: 'nest_angular_todo',
  autoLoadEntities: true,
  synchronize: true

}
@Module({
  imports: [
    TodoModule,
    TypeOrmModule.forRoot(ormOptions),
    AuthModule

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
