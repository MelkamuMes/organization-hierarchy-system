import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
// from dave tutor

@Module({
    controllers: [UsersController],
    providers: [UsersService]
})
export class UsersModule {}
