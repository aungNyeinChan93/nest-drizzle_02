/* eslint-disable prettier/prettier */
import { index } from "drizzle-orm/pg-core";
import { timestamp } from "drizzle-orm/pg-core";
import { text } from "drizzle-orm/pg-core";
import { uuid } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";



export const userTable = pgTable('users', {
    id: uuid().primaryKey().defaultRandom(),
    name: text('name').notNull(),
    email: text('email').notNull().unique(),
    password: text('password').notNull(),
    created_at: timestamp().defaultNow().notNull(),
    updated_at: timestamp().$onUpdate(() => new Date())
}, (table) => ({
    emailIndex: index('email_index').on(table.email)
}))
