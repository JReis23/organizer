import { eq } from 'drizzle-orm';
import { sha256 } from '@oslojs/crypto/sha2';
import { encodeBase32LowerCaseNoPadding, encodeHexLowerCase } from '@oslojs/encoding';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';

const DAY_IN_MS = 1000 * 60 * 60 * 24;

export const sessionCookieName = 'auth-session';

function generateSessionToken(): string {
	const bytes = crypto.getRandomValues(new Uint8Array(20));
	const token = encodeBase32LowerCaseNoPadding(bytes);
	return token;
}

export async function createSession(user_id: string): Promise<table.Session> {
	const token = generateSessionToken();
	const session_id = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
	const session: table.Session = {
		id: session_id,
		user_id,
		expires_at: new Date(Date.now() + DAY_IN_MS * 30)
	};
	await db.insert(table.sessions).values(session);
	return session;
}

export async function invalidateSession(session_id: string): Promise<void> {
	await db.delete(table.sessions).where(eq(table.sessions.id, session_id));
}

export async function validateSession(session_id: string) {
	const [result] = await db
		.select({
			user: {
				id: table.users.id,
				user_name: table.users.user_name
			},
			session: table.sessions
		})
		.from(table.sessions)
		.innerJoin(table.users, eq(table.sessions.user_id, table.users.id))
		.where(eq(table.sessions.id, session_id));

	if (!result) {
		return { session: null, user: null };
	}
	const { session, user } = result;

	const session_expired = Date.now() >= session.expires_at.getTime();
	if (session_expired) {
		await db.delete(table.sessions).where(eq(table.sessions.id, session.id));
		return { session: null, user: null };
	}

	const should_renew = Date.now() >= session.expires_at.getTime() - DAY_IN_MS * 15;
	if (should_renew) {
		session.expires_at = new Date(Date.now() + DAY_IN_MS * 30);
		await db
			.update(table.sessions)
			.set({ expires_at: session.expires_at })
			.where(eq(table.sessions.id, session.id));
	}

	return { session, user };
}

export type SessionValidationResult = Awaited<ReturnType<typeof validateSession>>;
