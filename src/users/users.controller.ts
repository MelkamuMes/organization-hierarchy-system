import { Body, Controller, Delete, Get, Param, Patch, Post, Query, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import {CreateUserDto} from './dto/create-user.dto'
import {UpdateUserDto} from './dto/update-user.dto'

@Controller('users') // /users
export class UsersController {
    /* 
      GET /users - a route to return all users
      GET /users/:id - a route return the user by id
      POST /users  - a route  to create user on our system 
      PATCH /users/:id - a route to update user data
      DELETE /users/:id - a route to delete user data

      Pips - is a specific type of middleware which a class annotated with the @injectable() decorator
    */
     
      constructor(private readonly usersService: UsersService) {}

      @Get() // GET /users or /users?role=value&age=value 
      findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
        return this.usersService.findAll(role)
      }

      @Get(':id')  // GET /users/:id   - a route to return all users
      findOne(@Param('id', ParseIntPipe) id:number) {
        return this.usersService.findOne(id)
      }

      @Post() // POST /users - a route  to create(post) new user data on our system
      create(@Body() createUserDto:  CreateUserDto  /* { name:string, email: string, role: 'INTERN' | 'ENGINEER' | 'ADMIN'} */) {
        return this.usersService.create(createUserDto)
      }

      @Patch(':id') // PATCH /users/:id - a route to update user data
      update(@Param('id', ParseIntPipe) id:number , @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(id, updateUserDto)
      }

      @Delete(':id')  // GET /users/:id   - a route to return all users
      delete(@Param('id', ParseIntPipe) id:number) {
        return this.usersService.delete(id)
      }

      
}
