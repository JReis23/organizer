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
		const formData = await event.request.formData();
		const username = formData.get('username');
		const password = formData.get('password');
		const email = formData.get('email');

		if (!validateUsername(username)) {
			return fail(400, { message: 'Invalid username' });
		}
		if (!validatePassword(password)) {
			return fail(400, { message: 'Invalid password' });
		}
		if (!validateEmail(email)) {
			return fail(400, { message: 'Invalid email' });
		}

		const results = await db
			.select()
			.from(table.user)
			.where(and(eq(table.user.username, username), eq(table.user.email, email)));

		const existingUser = results.at(0);
		if (!existingUser) {
			return fail(400, { message: 'Incorrect username or password' });
		}

		const validPassword = await verify(existingUser.passwordHash, password, {
			memoryCost: 19456,
			timeCost: 2,
			outputLen: 32,
			parallelism: 1
		});
		if (!validPassword) {
			return fail(400, { message: 'Incorrect username or password' });
		}

		const session = await auth.createSession(existingUser.id);
		event.cookies.set(auth.sessionCookieName, session.id, {
			path: '/',
			sameSite: 'lax',
			httpOnly: true,
			expires: session.expiresAt,
			secure: !dev
		});

		return redirect(302, '/');
	},
	register: async (event) => {
		const formData = await event.request.formData();

		const username = formData.get('username');
		const password = formData.get('password');
		const email = formData.get('email');

		if (!validateUsername(username)) {
			return fail(400, { message: 'Invalid username' });
		}
		if (!validatePassword(password)) {
			return fail(400, { message: 'Invalid password' });
		}

		if (!validateEmail(email)) {
			return fail(400, { message: 'Invalid email' });
		}

		const userId = generateUserId();
		const passwordHash = await hash(password, {
			// recommended minimum parameters
			memoryCost: 19456,
			timeCost: 2,
			outputLen: 32,
			parallelism: 1
		});

		try {
			await db.insert(table.user).values({ id: userId, username, passwordHash, email });

			const session = await auth.createSession(userId);
			event.cookies.set(auth.sessionCookieName, session.id, {
				path: '/',
				sameSite: 'lax',
				httpOnly: true,
				expires: session.expiresAt,
				secure: !dev
			});
		} catch (e) {
			return fail(500, { message: `${e} An error has occurred` });
		}
		return redirect(302, '/');
	}
};

const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_';

function generateUserId(length = 21): string {
	return generateRandomString({ read: (bytes) => crypto.getRandomValues(bytes) }, alphabet, length);
}

function validateUsername(username: unknown): username is string {
	return (
		typeof username === 'string' &&
		username.length >= 3 &&
		username.length <= 31 &&
		/^[a-z0-9_-]+$/.test(username)
	);
}

function validatePassword(password: unknown): password is string {
	return typeof password === 'string' && password.length >= 6 && password.length <= 255;
}

function validateEmail(email: unknown): email is string {
	return (
		typeof email === 'string' &&
		email.length >= 6 &&
		email.length <= 150 &&
		/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
	);
}