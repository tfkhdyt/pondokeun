import { TRPCClientError } from '@trpc/client';
import toast from 'svelte-french-toast';

import { invalidate } from '$app/navigation';

import { trpc } from './trpc/client';

export const deleteLink = async (slug: string) => {
	try {
		await trpc().deleteLink.mutate({ slug });
		await invalidate('links');
		toast.success(`/${slug} has been deleted successfully`, { position: 'top-right' });
	} catch (error) {
		if (error instanceof TRPCClientError) {
			toast.error(error.message, { position: 'top-right' });
		}
	}
};
