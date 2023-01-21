import { fail, type Actions } from '@sveltejs/kit';

export const actions: Actions = {
	default: async (event) => {
		const data = await event.request.formData();
		const link = data.get('link');

		if (!link) {
			return fail(400, { link, missing: true });
		}

		return { link };
	}
};
