/* eslint-disable prettier/prettier */
import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { profileTable } from "../users.schema";



export type Profile = InferSelectModel<typeof profileTable>;

export type CreateProfile = InferInsertModel<typeof profileTable>

export type UpdateProfile = Partial<Pick<Profile, 'avator' | 'bio' | 'isEmailVerfiy'>>