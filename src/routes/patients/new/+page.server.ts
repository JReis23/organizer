import { generateRandomString } from '@oslojs/crypto/random';
import { fail, redirect } from '@sveltejs/kit';
import { eq, and, or } from 'drizzle-orm';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import type { Actions, PageServerLoad } from '../$types';

export const load: PageServerLoad = async (event) => {
	if (!event.locals.user) {
		return redirect(302, '/login');
	}

	return { user: event.locals.user };
};

export const actions: Actions = {
	patients: async (event) => {
		const formData = await event.request.formData();
		const patient_name = formData.get('patient_name') as string | '';
		const patient_phone_number = formData.get('patient_phone_number') as string | '';
		const age = formData.get('age') as string | '';
		const patient_email = formData.get('patient_email') as string | '';
		const street = formData.get('street') as string | '';
		const city = formData.get('city') as string | '';
		const postal_code = formData.get('postal_code') as string | '';
		const country = formData.get('country') as string | 'France';

		let address_id = generateId();
		const patient_id = generateId();

		if (!patient_name) {
			return fail(400, { message: 'Missing required fields' });
		}

		try {
			const [existingAddress, existingPatient] = await Promise.all([
				db
					.select()
					.from(table.addresses)
					.where(
						and(
							eq(table.addresses.street, street),
							eq(table.addresses.city, city),
							eq(table.addresses.postal_code, postal_code),
							eq(table.addresses.country, country)
						)
					)
					.limit(1),
				db
					.select()
					.from(table.patients)
					.where(
						or(
							eq(table.patients.patient_name, patient_name),
							eq(table.patients.patient_email, patient_email)
						)
					)
					.limit(1)
			]);

			if (existingAddress.length > 0) {
				address_id = existingAddress[0].id;
			} else {
				await db.insert(table.addresses).values({
					id: address_id,
					street,
					city,
					postal_code,
					country
				});
			}

			if (existingPatient.length > 0) {
				return fail(400, { message: 'This patient or email already exists' });
			} else {
				const patientValues = {
					id: patient_id,
					patient_name,
					patient_phone_number,
					age: parseInt(age, 10),
					patient_email,
					address_id,
					created_at: new Date(),
					updated_at: new Date()
				};
				await db.insert(table.patients).values(patientValues);
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
