import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Todo } from "./todo.entity";
import { TodosController } from "./todos.controller";
import { TodosService } from "./todos.service";
import { Catagory } from "./catagory.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Todo, Catagory])],
    controllers: [TodosController],
    providers: [TodosService]
})

export class TodosModule {}



