import BaseError from './BaseError';

export default class NotFoundError extends BaseError {
	constructor(message: string) {
		super('NOT_FOUND', message);
	}
}
