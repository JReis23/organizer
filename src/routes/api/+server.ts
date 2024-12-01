import { error } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url, locals }) => {
	if (!locals.session) {
		throw redirect(303, '/login');
	}

	try {
		const query = url.searchParams.get('q') || '';

		const apiUrl = `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(query)}`;
		const response = await fetch(apiUrl);

		console.log({ response });

		if (!response.ok) {
			error(response.status, `HTTP error! status: ${response.status}`);
		}

		const data = await response.json();

		return new Response(JSON.stringify(data), {
			headers: {
				'Content-Type': 'application/json'
			}
		});
	} catch (error) {
		return new Response(
			JSON.stringify({ error: error instanceof Error ? error.message : 'An error occurred' }),
			{
				status: 500,
				headers: {
					'Content-Type': 'application/json'
				}
			}
		);
	}
};
