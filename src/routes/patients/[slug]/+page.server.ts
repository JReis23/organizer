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
			patientName: table.patient.patientName,
			adress: table.adress.adress,
			postal_code: table.adress.postal_code,
			city: table.adress.city,
			country: table.adress.country,
			email: table.patient.email,
			phoneNumber: table.patient.phoneNumber,
			treatmentType: table.treatments.treatmentType,
			treatmentDate: table.treatments.treatmentDate
		})
		.from(table.adress)
		.leftJoin(table.patient, eq(table.adress.id, table.patient.adressId))
		.leftJoin(table.treatments, eq(table.patient.id, table.treatments.patientId))
		.where(eq(table.patient.id, slug));

	return { patients, slug };
};

export const actions: Actions = {
	treatment: async (event) => {
		const formData = await event.request.formData();
		const treatmentType = formData.get('treatmentType') as string | '';
		const treatmentDate = new Date(formData.get('treatmentDate') as string);

		const patientId = event.params.slug;
		const id = generateId();

		if (!treatmentDate || !treatmentType) {
			return fail(400, { message: 'Ajoutez une Date et un Type de treatement' });
		}

		try {
			const patientTreatments = {
				id,
				patientId,
				treatmentType,
				treatmentDate
			};

			console.log({ patientTreatments });

			await db.insert(table.treatments).values(patientTreatments);

			return { success: true };
		} catch (e) {
			return fail(500, { message: `${e} An error has occurred` });
		}
	}
};

const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_';

function generateId(length = 21): string {
	return generateRandomString({ read: (bytes) => crypto.getRandomValues(bytes) }, alphabet, length);
}
