import { hash, verify } from '@node-rs/argon2';
import { generateRandomString } from '@oslojs/crypto/random';
import { fail, redirect } from '@sveltejs/kit';
import { eq, and } from 'drizzle-orm';
import { dev } from '$app/environment';
import * as auth from '$lib/server/auth';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	if (event.locals.session) {
		return redirect(302, '/logout');
	}
	return {};
};

export const actions: Actions = {
	login: async (event) => {
		const form_data = await event.request.formData();
		const user_name = form_data.get('user_name');
		const password = form_data.get('password');
		const user_email = form_data.get('user_email');

		console.log({ user_name, password, user_email });

		if (!validate_user_name(user_name)) {
			return fail(400, { message: 'Invalid username' });
		}
		if (!validate_password(password)) {
			return fail(400, { message: 'Invalid password' });
		}
		if (!validate_email(user_email)) {
			return fail(400, { message: 'Invalid email' });
		}

		const results = await db
			.select()
			.from(table.users)
			.where(and(eq(table.users.user_name, user_name), eq(table.users.user_email, user_email)));

		const existing_user = results.at(0);
		if (!existing_user) {
			return fail(400, { message: 'Incorrect username or password' });
		}

		const valid_password = await verify(existing_user.password_hash, password, {
			memoryCost: 19456,
			timeCost: 2,
			outputLen: 32,
			parallelism: 1
		});
		if (!valid_password) {
			return fail(400, { message: 'Incorrect username or password' });
		}

		const session = await auth.createSession(existing_user.id);
		event.cookies.set(auth.sessionCookieName, session.id, {
			path: '/',
			sameSite: 'lax',
			httpOnly: true,
			expires: session.expires_at,
			secure: !dev
		});

		return redirect(302, '/');
	},

	register: async (event) => {
		const form_data = await event.request.formData();
		const user_name = form_data.get('user_name');
		const password = form_data.get('password');
		const user_email = form_data.get('user_email');

		if (!validate_user_name(user_name)) {
			return fail(400, { message: 'Invalid username' });
		}
		if (!validate_password(password)) {
			return fail(400, { message: 'Invalid password' });
		}
		if (!validate_email(user_email)) {
			return fail(400, { message: 'Invalid email' });
		}

		const user_id = generate_user_id();
		const password_hash = await hash(password, {
			memoryCost: 19456,
			timeCost: 2,
			outputLen: 32,
			parallelism: 1
		});

		try {
			await db.insert(table.users).values({
				id: user_id,
				user_name,
				password_hash,
				user_email
			});

			const session = await auth.createSession(user_id);
			event.cookies.set(auth.sessionCookieName, session.id, {
				path: '/',
				sameSite: 'lax',
				httpOnly: true,
				expires: session.expires_at,
				secure: !dev
			});
		} catch (e) {
			return fail(500, { message: `${e} An error has occurred` });
		}
		return redirect(302, '/');
	}
};

const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_';

function generate_user_id(length = 21): string {
	return generateRandomString({ read: (bytes) => crypto.getRandomValues(bytes) }, alphabet, length);
}

function validate_user_name(user_name: unknown): user_name is string {
	return (
		typeof user_name === 'string' &&
		user_name.length >= 3 &&
		user_name.length <= 31 &&
		/^[a-z0-9_-]+$/.test(user_name)
	);
}

function validate_password(password: unknown): password is string {
	return typeof password === 'string' && password.length >= 6 && password.length <= 255;
}

function validate_email(email: unknown): email is string {
	return (
		typeof email === 'string' &&
		email.length >= 6 &&
		email.length <= 150 &&
		/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
	);
}
