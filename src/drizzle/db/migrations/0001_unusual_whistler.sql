CREATE TYPE "public"."userRoles" AS ENUM('user', 'admin', 'guest');--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "role" "userRoles" DEFAULT 'guest' NOT NULL;