ALTER TABLE "quotes" DROP CONSTRAINT "quotes_author_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "quotes" ADD CONSTRAINT "quotes_author_id_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;