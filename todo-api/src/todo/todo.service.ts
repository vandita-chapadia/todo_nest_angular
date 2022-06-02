import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createTodo } from 'src/DTO/create-todo.dto';
import { TodoEntity, TodoStatus } from 'src/Entity/todo.entity';
import { UserEntity } from 'src/Entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TodoService {
    constructor(@InjectRepository(TodoEntity) private repo: Repository<TodoEntity>) { }


    async getAllTodos(user: UserEntity): Promise<TodoEntity[]> {
        //return await this.repo.find();
        const query = await this.repo.createQueryBuilder('todo')
        query.where(`todo.userId=:userId`, { userId: user.id })
        try {
            return await query.getMany()
        }
        catch (err) {
            throw new NotFoundException('No Todo Found');
        }



    }

    async createTodo(createTodoDto: createTodo, user: UserEntity): Promise<TodoEntity> {
        const todo: TodoEntity = new TodoEntity();
        const { title, description } = createTodoDto;
        todo.title = title;
        todo.description = description;
        todo.status = TodoStatus.OPEN;
        todo.userId = user.id;
        this.repo.create(todo);

        try {
            return await this.repo.save(todo);
        }
        catch (err) {
            throw new InternalServerErrorException('Something went wrong , your todo is not created')
        }
    }

    async updateTodo(id: number, status: TodoStatus, user: UserEntity): Promise<TodoEntity> {

        try {
            await this.repo.update({ id, userId: user.id }, { status });
            return await this.repo.findOne({ id })

        }
        catch (err) {
            throw new InternalServerErrorException('Something went wrong , your todo is not updated')
        }
    }

    async deleteTodo(id: number, user: UserEntity) {
        const result = this.repo.delete({ id, userId: user.id })

        if ((await result).affected === 0) {
            throw new NotFoundException("Todo is not deleted");
        }
        else {
            return { success: true }
        }

    }


}
