/* eslint-disable prettier/prettier */
import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { categoryTable } from "../categories-schema";


export type Category = InferSelectModel<typeof categoryTable>;
export type CreateCategory = InferInsertModel<typeof categoryTable>;
export type UpdateCategory = Partial<Pick<Category, 'name'>>