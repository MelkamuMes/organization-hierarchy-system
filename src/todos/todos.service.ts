import { Injectable } from "@nestjs/common";
import { Todo } from "./todo.entity";
import { create } from "domain";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { createTodoDto } from "./dtos/create-todo.dto";
import { todo } from "node:test";

@Injectable()
export class TodosService {
    constructor(
        @InjectRepository(Todo) private readonly todoRepository: Repository<Todo>,
) {}

     async   create(dto: createTodoDto) {
            const todo = this.todoRepository.create(dto);

            return await this.todoRepository.save(todo);
        }

        findMany() {
            return this.todoRepository.find();  //
        }

      async  update(id: number , dto: createTodoDto) {
            const todo = await this.todoRepository.findOne({where: { id }});
            // check that record exists

           Object.assign(todo, dto);

           return await this.todoRepository.save(todo)
        }

        async delete(id: number) {
            const todo = await this.todoRepository.findOne({where: { id }});
            // check that record exists

           return await this.todoRepository.remove(todo);
        }
}