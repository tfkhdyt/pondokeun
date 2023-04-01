import BaseError from './BaseError';

export default class BadRequestError extends BaseError {
	constructor(message: string) {
		super('BAD_REQUEST', message);
	}
}
