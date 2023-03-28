export interface CreateLinkRequest {
	link: string;
	slug?: string;
	email?: string | null;
}

export interface UpdateLinkRequest {
	slug: string;
}
