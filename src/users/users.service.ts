import { Injectable } from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto'
import {UpdateUserDto} from './dto/update-user.dto'

@Injectable()
export class UsersService {
    private users = [
        {
            "id": 1,
            "name": "Abebe Ashe",
            "email": "abebe@ashe.ash",
            "role": "INTERN",
        },
        {
            "id": 2,
            "name": "Bekele Beke",
            "email": "bekele@beke.bek",
            "role": "INTERN",
        },
        {
            "id": 3,
            "name": "Chernet Chere",
            "email": "chernet@chere.che",
            "role": "INTERN",
        },
        {
            "id": 4,
            "name": "Kebede Kebe",
            "email": "kebede@kebe.keb",
            "role": "ENGINEER",
        },
        {
            "id": 5,
            "name": "Zelalem Zele",
            "email": "zelalem@zele.zle",
            "role": "ADMIN",
        },
    ]

    findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
        if (role) {
            return this.users.filter(user => user.role === role)
        }
        return this.users
    }

    findOne(id: number) {
        const user = this.users.find(user => user.id === id)

        return user
    }

    create(createUserDto:CreateUserDto){
        const usersByHighestId = [...this.users].sort((a,b)=> b.id - a.id)
        const newUser = {
            id: usersByHighestId[0].id + 1,
            ...createUserDto
        }
        this.users.push(newUser)
        return newUser
    }
    // ?: symbole used to show that the update can be optional for each value
    update(id: number, updatedUser: UpdateUserDto) {
        this.users = this.users.map(user => {
            if (user.id === id){
                return {...user, ...updatedUser}
            }
            return user
        })
    }

    delete(id: number) {
        const removedUser = this.findOne(id)

        this.users = this.users.filter(user => user.id !== id)

        return removedUser
    }
 

}

 