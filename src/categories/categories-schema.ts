/* eslint-disable prettier/prettier */
import { relations } from "drizzle-orm";
import { text } from "drizzle-orm/pg-core";
import { index } from "drizzle-orm/pg-core";
import { timestamp } from "drizzle-orm/pg-core";
import { uuid } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";
import { quoteTable } from "src/quotes/quotes.schema";



export const categoryTable = pgTable('categories', {
    id: uuid().primaryKey().defaultRandom(),
    name: text().notNull(),
    created_at: timestamp().defaultNow(),
    updated_at: timestamp().$onUpdate(() => new Date),
}, (table) => ({
    nameIndex: index('name_index').on(table?.name)
}));

export const categoryRelation = relations(categoryTable, ({ many }) => ({
    categoryQuote: many(categoryQuoteTable)
}))


export const categoryQuoteTable = pgTable('categoryQuote', {
    id: uuid().primaryKey().defaultRandom(),
    category_id: uuid().references(() => categoryTable?.id, { onDelete: 'cascade' }).notNull(),
    quote_id: uuid().references(() => quoteTable?.id, { onDelete: 'cascade' }).notNull()
})

export const categoryQuoteRelation = relations(categoryQuoteTable, ({ one }) => ({
    category: one(categoryTable, {
        fields: [categoryQuoteTable?.category_id],
        references: [categoryTable?.id]
    }),
    quote: one(quoteTable, {
        fields: [categoryQuoteTable?.quote_id],
        references: [quoteTable?.id]
    })
}))