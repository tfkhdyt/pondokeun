import { z } from 'zod';

export const linkSchema = z.object({
	link: z
		.string({ required_error: 'Link is required!', invalid_type_error: 'Invalid type' })
		.url({ message: 'Invalid url' }),
	customName: z.string().optional()
});
