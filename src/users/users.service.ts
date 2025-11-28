/* eslint-disable prettier/prettier */



import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { userTable } from './users.schema';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { eq } from 'drizzle-orm';
import * as userSchema from './users.schema'



@Injectable()
export class UsersService {


  constructor(
    @Inject('DRIZZLE') private db: NodePgDatabase<typeof userSchema>
  ) { }

  async create(createUserDto: CreateUserDto) {
    const user = await this.db.insert(userTable).values({ ...createUserDto })
    return user;
  }

  async findAll() {
    const users = this.db.select().from(userTable);
    return users;
  }

  async findOne(id: string) {
    // const user = (await this.db.select().from(userTable).where(eq(userTable?.id, id)));
    const user = await this.db.query.userTable.findFirst({
      where: eq(userTable?.id, id)
    });
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const updateUser = await this.db.update(userTable)
      .set({ ...updateUserDto })
      .where(eq(userTable?.id, id))
      .returning();
    return updateUser;
  }

  async remove(id: string) {
    const [deleteUser] = await this.db.delete(userTable).where(eq(userTable?.id, id)).returning();
    return `${deleteUser?.name} was deleted`
  }
}
