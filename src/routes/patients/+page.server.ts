import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import * as table from '$lib/server/db/schema';
import { db } from '$lib/server/db';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async (event) => {
	if (!event.locals.session) {
		return redirect(302, '/login');
	}

	const patients = await db
		.select({
			patientName: table.patient.patientName,
			adress: table.adress.adress,
			postal_code: table.adress.postal_code,
			phoneNumber: table.patient.phoneNumber,
			patientId: table.patient.id
		})
		.from(table.adress)
		.leftJoin(table.patient, eq(table.adress.id, table.patient.adressId));

	return { patients };
};
