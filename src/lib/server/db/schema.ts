import { pgTable, text, integer, timestamp, varchar } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
	id: text('id').primaryKey(),
	user_name: text('user_name').notNull().unique(),
	password_hash: text('password_hash').notNull(),
	created_at: timestamp('created_at').defaultNow(),
	updated_at: timestamp('updated_at').defaultNow(),
	user_email: text('user_email').unique().notNull()
});

export const sessions = pgTable('sessions', {
	id: text('id').primaryKey(),
	user_id: text('user_id')
		.notNull()
		.references(() => users.id),
	expires_at: timestamp('expires_at', { withTimezone: true, mode: 'date' }).notNull()
});

export const addresses = pgTable('addresses', {
	id: text('id').primaryKey(),
	street: varchar('street', { length: 100 }),
	city: varchar('city', { length: 50 }),
	postal_code: varchar('postal_code', { length: 10 }),
	country: varchar('country', { length: 20 }).default('France'),
	created_at: timestamp('created_at').defaultNow(),
	updated_at: timestamp('updated_at').defaultNow()
});

export const patients = pgTable('patients', {
	id: text('id').primaryKey(),
	age: integer('age'),
	patient_name: text('patient_name').notNull().unique(),
	created_at: timestamp('created_at').defaultNow(),
	updated_at: timestamp('updated_at').defaultNow(),
	address_id: text('address_id').references(() => addresses.id),
	patient_phone_number: text('phone_number'),
	patient_email: varchar('email', { length: 150 }).unique()
});

export const treatments = pgTable('treatments', {
	id: text('id').primaryKey(),
	treatment_date: timestamp('treatment_date'),
	treatment_type: varchar('treatment_type', { length: 256 }),
	patient_id: text('patient_id').references(() => patients.id),
	created_at: timestamp('created_at').defaultNow(),
	updated_at: timestamp('updated_at').defaultNow()
});

export type Session = typeof sessions.$inferSelect;
export type User = typeof users.$inferSelect;
export type Address = typeof addresses.$inferSelect;
export type Patient = typeof patients.$inferSelect;
export type Treatment = typeof treatments.$inferSelect;
