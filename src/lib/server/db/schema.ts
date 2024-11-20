import { pgTable, text, integer, timestamp, varchar } from 'drizzle-orm/pg-core';
export const user = pgTable('user', {
	id: text('id').primaryKey(),
	username: text('username').notNull().unique(),
	passwordHash: text('password_hash').notNull(),
	createdAt: timestamp('createdAt').defaultNow(),
	updatedAt: timestamp('updatedAt').defaultNow(),
	email: text('email').unique().notNull()
});

export const session = pgTable('session', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
	expiresAt: timestamp('expires_at', { withTimezone: true, mode: 'date' }).notNull()
});

export const adress = pgTable('adress', {
	id: text('id').primaryKey(), // Clé primaire
	adress: varchar('adress', { length: 100 }),
	city: varchar('city', { length: 50 }),
	postal_code: varchar('postal_code', { length: 10 }),
	country: varchar('country', { length: 20 }).default('France'),
	createdAt: timestamp('createdAt').defaultNow(),
	updatedAt: timestamp('updatedAt').defaultNow()
});

export const patient = pgTable('patient', {
	id: text('id').primaryKey(),
	age: integer('age'),
	patientName: text('patientName').notNull().unique(),
	createdAt: timestamp('createdAt').defaultNow(),
	updatedAt: timestamp('updatedAt').defaultNow(),
	adressId: text('adressId_id').references(() => adress.id),
	phoneNumber: text('phone_number'),
	email: varchar('email', { length: 150 }).unique()
});

export const treatments = pgTable('treatments', {
	id: text('id').primaryKey(), // Clé primaire
	treatmentDate: timestamp('treatmentDate'),
	treatmentType: varchar('treatmentType', { length: 256 }),
	patientId: text('patient_id').references(() => patient.id), // Clé étrangère vers 'users'
	createdAt: timestamp('createdAt').defaultNow(),
	updatedAt: timestamp('updatedAt').defaultNow()
});

export type Session = typeof session.$inferSelect;
export type User = typeof user.$inferSelect;
export type Adress = typeof adress.$inferSelect;
export type Treatment = typeof treatments.$inferSelect;
