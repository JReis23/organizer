import { generateRandomString } from '@oslojs/crypto/random';
import { fail, redirect } from '@sveltejs/kit';
import { eq, and, or } from 'drizzle-orm';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import type { Actions, PageServerLoad } from '../../$types';

export const load: PageServerLoad = async (event) => {
	if (!event.locals.user) {
		return redirect(302, '/login');
	}

	return { user: event.locals.user };
};

export const actions: Actions = {
	patients: async (event) => {
		const formData = await event.request.formData();
		const patientName = formData.get('patientName') as string | '';
		const phoneNumber = formData.get('phoneNumber') as string | '';
		const age = formData.get('age') as string | '';
		const email = formData.get('email') as string | '';
		const adress = formData.get('adress') as string | '';
		const city = formData.get('city') as string | '';
		const postal_code = formData.get('postal_code') as string | '';
		const country = formData.get('country') as string | 'France';

		let adressId = generateId();
		const patientId = generateId();

		if (!patientName) {
			return fail(400, { message: 'Missing required fields' });
		}

		try {
			const [existingAdress, existingPatientName] = await Promise.all([
				db
					.select()
					.from(table.adress)
					.where(
						and(
							eq(table.adress.adress, adress),
							eq(table.adress.city, city),
							eq(table.adress.postal_code, postal_code),
							eq(table.adress.country, country)
						)
					)
					.limit(1),
				db
					.select()
					.from(table.patient)
					.where(or(eq(table.patient.patientName, patientName), eq(table.patient.email, email)))
					.limit(1)
			]);

			if (existingAdress.length > 0) {
				adressId = existingAdress[0].id;
			} else {
				await db.insert(table.adress).values({
					id: adressId,
					adress,
					city,
					postal_code,
					country
				});
			}

			console.log({ existingPatientName });

			if (existingPatientName.length > 0) {
				return fail(400, { message: 'This patient or email already exists' });
			} else {
				const patientValues = {
					id: patientId, // This should be a string as defined in the schema
					patientName,
					phoneNumber,
					age: parseInt(age, 10), // Ensure age is a number
					email,
					adressId,
					createdAt: new Date(), // Ensure createdAt is a valid date (if needed)
					updatedAt: new Date() // Ensure updatedAt is a valid date (if needed)
				};

				console.log({ patientValues });

				await db.insert(table.patient).values(patientValues);
			}
		} catch (e) {
			return fail(500, { message: `${e} An error has occurred` });
		}
		return redirect(302, '/patients');
	}
};

const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_';

function generateId(length = 21): string {
	return generateRandomString({ read: (bytes) => crypto.getRandomValues(bytes) }, alphabet, length);
}
// function validateUsername(username: unknown): username is string {
// 	return (
// 		typeof username === 'string' &&
// 		username.length >= 3 &&
// 		username.length <= 31 &&
// 		/^[a-z0-9_-]+$/.test(username)
// 	);
// }

// function validatePassword(password: unknown): password is string {
// 	return typeof password === 'string' && password.length >= 6 && password.length <= 255;
// }

// function validateEmail(email: unknown): email is string {
// 	return (
// 		typeof email === 'string' &&
// 		email.length >= 6 &&
// 		email.length <= 150 &&
// 		/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
// 	);

// }
