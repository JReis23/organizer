import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, url }) => {
	console.log({ locals });
	if (url.pathname === '/login') {
		return;
	}

	if (!locals.session) {
		throw redirect(303, '/login');
	}

	return {
		session: locals.session
	};
};
