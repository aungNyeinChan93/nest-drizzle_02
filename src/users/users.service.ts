import { profileTable } from './users.schema';
/* eslint-disable prettier/prettier */



import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { userTable } from './users.schema';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { eq } from 'drizzle-orm';
import * as userSchema from './users.schema'
import * as bcrypt from 'bcrypt'
import { CreateProfile } from './types/profile-types';


@Injectable()
export class UsersService {

  constructor(
    @Inject('DRIZZLE') private db: NodePgDatabase<typeof userSchema>
  ) { }

  async create(createUserDto: CreateUserDto) {
    const hashPassword = await bcrypt.hash(createUserDto.password, await bcrypt.genSalt(10))
    const user = await this.db.insert(userTable)
      .values({ ...createUserDto, password: hashPassword }).returning();
    return user;
  }

  async findAll() {
    const users = this.db.select().from(userTable);
    return users;
  }

  async findOne(id: string) {
    // const user = (await this.db.select().from(userTable).where(eq(userTable?.id, id)));
    const user = await this.db.query.userTable.findFirst({
      where: eq(userTable?.id, id),
      with: {
        quotes: {
          columns: { id: true, quote: true }
        },
        profile: true
      }
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


  async createProfile(createProfielDto: CreateProfile) {
    const isProfileHas = await this.db.query.profileTable.findFirst(
      {
        where: eq(profileTable?.user_id, createProfielDto?.user_id)
      }
    );
    if (isProfileHas) throw new ConflictException('profile is already exists')
    const [profile] = await this.db.insert(userSchema.profileTable)
      .values(createProfielDto)
      .returning();
    return profile;
  };

  async profiles() {
    const profiles = await this.db.query.profileTable.findMany({
      with: { user: true },
      orderBy: (tb, fns) => fns.desc(tb.timestamp)
    });
    return profiles
  }
}
