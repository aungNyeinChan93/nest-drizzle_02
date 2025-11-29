/* eslint-disable prettier/prettier */
import { relations } from "drizzle-orm";
import { index } from "drizzle-orm/pg-core";
import { timestamp } from "drizzle-orm/pg-core";
import { boolean } from "drizzle-orm/pg-core";
import { pgEnum } from "drizzle-orm/pg-core";
import { text } from "drizzle-orm/pg-core";
import { uuid } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";
import { quoteTable } from "src/quotes/quotes.schema";

export const UserRole = pgEnum('userRoles', ['user', 'admin', 'guest'])

export const userTable = pgTable('users', {
    id: uuid().primaryKey().defaultRandom(),
    name: text('name').notNull(),
    email: text('email').notNull().unique(),
    password: text('password').notNull(),
    role: UserRole('role').notNull().default('guest'),
    created_at: timestamp().defaultNow().notNull(),
    updated_at: timestamp().$onUpdate(() => new Date())
}, (table) => ({
    emailIndex: index('email_index').on(table.email)
}))


export const userRelation = relations(userTable, ({ one, many }) => ({
    quotes: many(quoteTable),
    profile: one(profileTable)
}))

export const profileTable = pgTable('profiles', {
    id: uuid().primaryKey().defaultRandom(),
    isEmailVerfiy: boolean().default(false).notNull(),
    avator: text(),
    bio: text(),
    user_id: uuid().references(() => userTable?.id, { onDelete: 'cascade' }).notNull(),
    timestamp: timestamp().defaultNow().notNull()
});


export const profileRelation = relations(profileTable, ({ one }) => ({
    user: one(userTable, { fields: [profileTable?.user_id], references: [userTable?.id] })
}))