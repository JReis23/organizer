import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import * as table from '$lib/server/db/schema';
import { db } from '$lib/server/db';
import { desc, eq } from 'drizzle-orm';

export const load: PageServerLoad = async (event) => {
	if (!event.locals.session) {
		return redirect(302, '/login');
	}

	const patients = await db
		.select({
			patient_name: table.patients.patient_name,
			street: table.addresses.street,
			postal_code: table.addresses.postal_code,
			patient_phone_number: table.patients.patient_phone_number,
			patient_id: table.patients.id,
			city: table.addresses.city,
			treatment_type: table.treatments.treatment_type,
			treatment_date: table.treatments.treatment_date
		})
		.from(table.addresses)
		.leftJoin(table.patients, eq(table.addresses.id, table.patients.address_id))
		.leftJoin(table.treatments, eq(table.patients.id, table.treatments.patient_id))
		.orderBy(desc(table.treatments.treatment_date));

	// Map the results and handle the date conversion
	const formattedPatients = patients.map((patient) => ({
		...patient,
		treatment_date: patient.treatment_date ? new Date(patient.treatment_date).toISOString() : null
	}));

	return { patients: formattedPatients };
};
