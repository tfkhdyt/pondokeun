import BaseError from './BaseError';

export default class InternalServerError extends BaseError {
	constructor(message: string) {
		super('INTERNAL_SERVER_ERROR', message);
	}
}
