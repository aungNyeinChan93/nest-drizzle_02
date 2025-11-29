
/* eslint-disable prettier/prettier */
import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { userTable } from "../users.schema";



export type User = InferSelectModel<typeof userTable>;
export type CreateUser = InferInsertModel<typeof userTable>;
export type UpdateUser = Partial<Pick<User, 'email' | 'name' | 'password'>>;


export const test = userTable?.$inferInsert;
export type Test = typeof test