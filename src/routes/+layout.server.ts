import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import type { Session } from '$lib/server/db/schema';

export const load: LayoutServerLoad = async ({ locals, url }) => {
	console.log({ locals });
	if (url.pathname === '/login') {
		return;
	}

	if (!locals.session) {
		throw redirect(303, '/login');
	}

	return {
		session: locals.session as Session
	};
};
