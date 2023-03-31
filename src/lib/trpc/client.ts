import { createTRPCClient, type TRPCClientInit } from 'trpc-sveltekit';

import type { Router } from '$lib/trpc/router';

let browserclient: ReturnType<typeof createTRPCClient<Router>>;

export function trpc(init?: TRPCClientInit) {
	const isBrowser = typeof window !== 'undefined';
	if (isBrowser && browserclient) return browserclient;
	const client = createTRPCClient<Router>({ init });
	if (isBrowser) browserclient = client;
	return client;
}
