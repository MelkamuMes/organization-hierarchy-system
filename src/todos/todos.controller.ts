import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from "@nestjs/common";
import { TodosService } from "./todos.service";
import { createTodoDto } from "./dtos/create-todo.dto";

@Controller("todos")
export class TodosController {
    constructor(private readonly todosService: TodosService) {}

    @Post()
    create(@Body() dto: createTodoDto) {
        return this.todosService.create(dto);
    }

    @Get()
    findMany(@Body() dto: createTodoDto) {
        return this.todosService.findMany();
    }

    @Put(':id')
    update( @Param('id') id:number , @Body() dto: createTodoDto) {
        return this.todosService.update(id , dto);
    }

    @Delete(':id')
    delete( @Param('id') id:number) {
        return this.todosService.delete(id);
    }
    
}