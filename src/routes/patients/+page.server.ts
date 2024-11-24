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
			patientName: table.patient.patientName,
			adress: table.adress.adress, // Keeping original spelling
			postal_code: table.adress.postal_code,
			phoneNumber: table.patient.phoneNumber,
			patientId: table.patient.id,
			patientCity: table.adress.city,
			treatmentType: table.treatments.treatmentType,
			treatmentUpcomming: table.treatments.treatmentDate // Matching type definition spelling
		})
		.from(table.adress)
		.leftJoin(table.patient, eq(table.adress.id, table.patient.adressId))
		.leftJoin(table.treatments, eq(table.patient.id, table.treatments.patientId))
		.orderBy(desc(table.treatments.treatmentDate));

	// Map the results and handle the date conversion
	const formattedPatients = patients.map((patient) => ({
		...patient,
		treatmentUpcomming: patient.treatmentUpcomming
			? new Date(patient.treatmentUpcomming).toISOString()
			: null
	}));

	return { patients: formattedPatients };
};
