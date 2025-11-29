/* eslint-disable prettier/prettier */



import { relations } from "drizzle-orm";
import { text } from "drizzle-orm/pg-core";
import { index } from 'drizzle-orm/pg-core';
import { boolean } from "drizzle-orm/pg-core";
import { timestamp } from "drizzle-orm/pg-core";
import { uuid } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";
import { userTable } from "src/users/users.schema";


export const quoteTable = pgTable('quotes', {
    id: uuid().primaryKey().defaultRandom(),
    quote: text().notNull(),
    author_id: uuid().references(() => userTable?.id, { onDelete: "cascade" }).notNull(),
    isActive: boolean().default(false),
    created_at: timestamp().defaultNow().notNull(),
    updated_at: timestamp().notNull().$onUpdate(() => new Date),
}, (table) => ({
    quoteIndex: index('quote_index').on(table?.quote)
}))

export const quoteRelation = relations(quoteTable, ({ one }) => ({
    user: one(userTable, {
        fields: [quoteTable?.author_id],
        references: [userTable?.id]
    })
}))