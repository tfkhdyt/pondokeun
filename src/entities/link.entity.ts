import { z } from 'zod';

export const linkSchema = z.object({
	link: z
		.string({ required_error: 'Link is required!', invalid_type_error: 'Invalid type' })
		.url({ message: 'Invalid URL' }),
	customName: z.string().optional(),
});

export const updateLinkSchema = z.object({
	customName: z.string({ required_error: 'Slug is required', invalid_type_error: 'Invalid type' }),
});

export function getUpdateLinkSchema(slug = '') {
	return z.object({
		customName: z
			.string({ required_error: 'Slug is required', invalid_type_error: 'Invalid type' })
			.default(slug),
	});
}

export const deleteLinkSchema = z.object({
	slug: z.string({
		invalid_type_error: 'Slug should be string',
		required_error: 'Slug is required',
	}),
});
