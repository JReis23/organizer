ALTER TABLE "address" RENAME TO "addresses";--> statement-breakpoint
ALTER TABLE "patient" RENAME TO "patients";--> statement-breakpoint
ALTER TABLE "session" RENAME TO "sessions";--> statement-breakpoint
ALTER TABLE "user" RENAME TO "users";--> statement-breakpoint
ALTER TABLE "addresses" RENAME COLUMN "createdAt" TO "created_at";--> statement-breakpoint
ALTER TABLE "addresses" RENAME COLUMN "updatedAt" TO "updated_at";--> statement-breakpoint
ALTER TABLE "patients" RENAME COLUMN "patientName" TO "patient_name";--> statement-breakpoint
ALTER TABLE "patients" RENAME COLUMN "createdAt" TO "created_at";--> statement-breakpoint
ALTER TABLE "patients" RENAME COLUMN "updatedAt" TO "updated_at";--> statement-breakpoint
ALTER TABLE "patients" RENAME COLUMN "adressId_id" TO "address_id";--> statement-breakpoint
ALTER TABLE "treatments" RENAME COLUMN "treatmentDate" TO "treatment_date";--> statement-breakpoint
ALTER TABLE "treatments" RENAME COLUMN "treatmentType" TO "treatment_type";--> statement-breakpoint
ALTER TABLE "treatments" RENAME COLUMN "createdAt" TO "created_at";--> statement-breakpoint
ALTER TABLE "treatments" RENAME COLUMN "updatedAt" TO "updated_at";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "username" TO "user_name";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "createdAt" TO "created_at";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "updatedAt" TO "updated_at";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "email" TO "user_email";--> statement-breakpoint
ALTER TABLE "patients" DROP CONSTRAINT "patient_patientName_unique";--> statement-breakpoint
ALTER TABLE "patients" DROP CONSTRAINT "patient_email_unique";--> statement-breakpoint
ALTER TABLE "users" DROP CONSTRAINT "user_username_unique";--> statement-breakpoint
ALTER TABLE "users" DROP CONSTRAINT "user_email_unique";--> statement-breakpoint
ALTER TABLE "patients" DROP CONSTRAINT "patient_adressId_id_address_id_fk";
--> statement-breakpoint
ALTER TABLE "sessions" DROP CONSTRAINT "session_user_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "treatments" DROP CONSTRAINT "treatments_patient_id_patient_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "patients" ADD CONSTRAINT "patients_address_id_addresses_id_fk" FOREIGN KEY ("address_id") REFERENCES "public"."addresses"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "treatments" ADD CONSTRAINT "treatments_patient_id_patients_id_fk" FOREIGN KEY ("patient_id") REFERENCES "public"."patients"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "patients" ADD CONSTRAINT "patients_patient_name_unique" UNIQUE("patient_name");--> statement-breakpoint
ALTER TABLE "patients" ADD CONSTRAINT "patients_email_unique" UNIQUE("email");--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_user_name_unique" UNIQUE("user_name");--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_user_email_unique" UNIQUE("user_email");