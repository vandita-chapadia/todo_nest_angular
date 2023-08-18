import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { Get } from '@nestjs/common';
import { TodoService } from './todo.service';
import { createTodo } from 'src/DTO/create-todo.dto';
import { TodoStatusValidationPipe } from 'src/Pipe/TodoStatusValidation.pipe';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/user.decorator';
import { UserEntity } from 'src/Entity/user.entity';
import { TodoStatus } from 'src/Entity/todo.entity';

@Controller('todos')
@UseGuards(AuthGuard())
export class TodoController {
  constructor(private todoService: TodoService) {}

  //get all todo list
  @Get()
  getAllTodos(@User() user: UserEntity) {
    return this.todoService.getAllTodos(user);
  }

  //create new todo
  @Post()
  createNewTodo(
    @Body(ValidationPipe) data: createTodo,
    @User() user: UserEntity,
  ) {
    return this.todoService.createTodo(data, user);
  }

  // update todo
  @Patch(':id')
  updateTodo(
    @Body('status', TodoStatusValidationPipe) status: TodoStatus,
    @Param('id') id: number,
    @User() user: UserEntity,
  ) {
    return this.todoService.updateTodo(id, status, user);
  }

  //delete todo
  @Delete(':id')
  deleteTodo(@Param('id') id: number, @User() user: UserEntity) {
    return this.todoService.deleteTodo(id, user);
  }
}
