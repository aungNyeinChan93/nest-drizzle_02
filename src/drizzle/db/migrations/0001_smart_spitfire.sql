CREATE TYPE "public"."userRole" AS ENUM('user', 'admin', 'guest');--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "role" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "role" SET DATA TYPE "public"."userRole" USING "role"::text::"public"."userRole";--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'guest';--> statement-breakpoint
DROP TYPE "public"."userRoles";