/* eslint-disable prettier/prettier */
import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { categoryQuoteTable, categoryTable } from "../categories-schema";


export type Category = InferSelectModel<typeof categoryTable>;
export type CreateCategory = InferInsertModel<typeof categoryTable>;
export type UpdateCategory = Partial<Pick<Category, 'name'>>

export type CreateCategoryAndQuote = {
    categoryId: string,
    quoteId: string
}

export type CategoryQuote = InferSelectModel<typeof categoryQuoteTable>
export type CreateCategoryQuote = InferInsertModel<typeof categoryQuoteTable>