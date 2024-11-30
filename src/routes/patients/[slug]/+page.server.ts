import { generateRandomString } from '@oslojs/crypto/random';
import { redirect, fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import * as table from '$lib/server/db/schema';
import { db } from '$lib/server/db';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async (event) => {
	if (!event.locals.session) {
		return redirect(302, '/login');
	}

	const { slug } = event.params;

	const patients = await db
		.select({
			patient_name: table.patients.patient_name,
			street: table.addresses.street,
			postal_code: table.addresses.postal_code,
			city: table.addresses.city,
			country: table.addresses.country,
			patient_email: table.patients.patient_email,
			patient_phone_number: table.patients.patient_phone_number,
			treatment_type: table.treatments.treatment_type,
			treatment_date: table.treatments.treatment_date
		})
		.from(table.addresses)
		.leftJoin(table.patients, eq(table.addresses.id, table.patients.address_id))
		.leftJoin(table.treatments, eq(table.patients.id, table.treatments.patient_id))
		.where(eq(table.patients.id, slug));

	return { patients, slug };
};

export const actions: Actions = {
	treatment: async (event) => {
		const formData = await event.request.formData();
		const treatment_type = formData.get('treatment_type') as string | '';
		const treatment_date = new Date(formData.get('treatment_date') as string);

		const patient_id = event.params.slug;
		const id = generateId();

		if (!treatment_date || !treatment_type) {
			return fail(400, { message: 'Ajoutez une Date et un Type de traitement' });
		}

		try {
			const patientTreatments = {
				id,
				patient_id,
				treatment_type,
				treatment_date
			};
			await db.insert(table.treatments).values(patientTreatments);

			return { success: true };
		} catch (e) {
			return fail(500, { message: `${e} An error has occurred` });
		}
	},

	updatePatient: async (event) => {
		const patient_id = event.params.slug;
		const formData = await event.request.formData();

		const currentData = await db
			.select({
				patient: {
					patient_name: table.patients.patient_name,
					patient_email: table.patients.patient_email,
					patient_phone_number: table.patients.patient_phone_number,
					address_id: table.patients.address_id
				},
				address: {
					street: table.addresses.street,
					city: table.addresses.city,
					postal_code: table.addresses.postal_code,
					country: table.addresses.country,
					id: table.addresses.id
				}
			})
			.from(table.patients)
			.leftJoin(table.addresses, eq(table.addresses.id, table.patients.address_id))
			.where(eq(table.patients.id, patient_id))
			.limit(1);

		if (!currentData.length) {
			return fail(404, { message: 'Aucun patient trouvé. Mise a jour impossible' });
		}

		const current = currentData[0];
		const currentAddress = current.address ?? {
			street: null,
			postal_code: null,
			city: null,
			country: null
		};

		const currentPatient = current.patient ?? {
			patient_name: null,
			patient_email: null,
			patient_phone_number: null
		};

		const addressValues: Partial<typeof current.address> = {};
		const patientValues: Partial<typeof current.patient> = {};

		const shouldUpdate = (newValue: FormDataEntryValue | null, currentValue: string | null) => {
			return newValue !== null && newValue !== '' && newValue !== currentValue;
		};

		const newStreet = formData.get('street');
		if (shouldUpdate(newStreet, currentAddress.street)) {
			addressValues.street = newStreet as string;
		}

		const newPostalCode = formData.get('postal_code');
		if (shouldUpdate(newPostalCode, currentAddress.postal_code)) {
			addressValues.postal_code = newPostalCode as string;
		}

		const newCity = formData.get('city');
		if (shouldUpdate(newCity, currentAddress.city)) {
			addressValues.city = newCity as string;
		}

		const newCountry = formData.get('country');
		if (shouldUpdate(newCountry, currentAddress.country)) {
			addressValues.country = newCountry as string;
		}

		const newPatientName = formData.get('patient_name');
		if (shouldUpdate(newPatientName, currentPatient.patient_name)) {
			patientValues.patient_name = newPatientName as string;
		}

		const newPatientEmail = formData.get('patient_email');
		if (shouldUpdate(newPatientName, currentPatient.patient_email)) {
			patientValues.patient_email = newPatientEmail as string;
		}

		const newPatientPhoneNumber = formData.get('patient_phone_number');
		if (shouldUpdate(newPatientName, currentPatient.patient_phone_number)) {
			patientValues.patient_phone_number = newPatientPhoneNumber as string;
		}

		try {
			await db.transaction(async (tx) => {
				if (Object.keys(addressValues).length > 0) {
					if (current.patient.address_id) {
						await tx
							.update(table.addresses)
							.set(addressValues)
							.where(eq(table.addresses.id, current.patient.address_id));
					} else {
						const newAddressId = generateId();
						await tx.insert(table.addresses).values({
							id: newAddressId,
							...addressValues
						});
						patientValues.address_id = newAddressId;
					}
				}

				if (Object.keys(patientValues).length > 0) {
					await tx
						.update(table.patients)
						.set(patientValues)
						.where(eq(table.patients.id, patient_id));
				}
			});

			return { success: true };
		} catch (e) {
			console.error(e);
			return fail(500, { message: 'Erreur lors de la mise à jour' });
		}
	}
};

const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_';

function generateId(length = 21): string {
	return generateRandomString({ read: (bytes) => crypto.getRandomValues(bytes) }, alphabet, length);
}
