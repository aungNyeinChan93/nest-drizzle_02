/* eslint-disable prettier/prettier */
import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { quoteTable } from "../quotes.schema";



export type Quote = InferSelectModel<typeof quoteTable>

export type CreateQuote = InferInsertModel<typeof quoteTable>

export type UpdateQuote = Partial<Pick<Quote, 'quote' | 'author_id' | 'isActive'>>