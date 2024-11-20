import * as auth from '$lib/server/auth';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	if (!event.locals.session) {
		throw redirect(302, '/login');
	}

	await auth.invalidateSession(event.locals.session.id);
	event.cookies.delete(auth.sessionCookieName, { path: '/' });

	throw redirect(302, '/login');
};
