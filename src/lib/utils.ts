import toast from 'svelte-french-toast';

import { invalidate } from '$app/navigation';

export const deleteLink = async (slug: string) => {
	const res = await fetch(`/api/links/${slug}`, {
		method: 'DELETE',
	});
	const data = await res.json();

	if (!res.ok) {
		toast.error(data.message, { position: 'top-right' });
		return;
	}

	toast.success(data.message, { position: 'top-right' });
	invalidate('links');
};
