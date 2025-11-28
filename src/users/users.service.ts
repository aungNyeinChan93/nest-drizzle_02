/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { userTable } from './users.schema';

@Injectable()
export class UsersService {

  constructor(
    @Inject('DRIZZLE') private db: any
  ) { }

  create(createUserDto: CreateUserDto) {
    // const user = await this.db.insert(userTable).values({...createUserDto})
    return { createUserDto }
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
