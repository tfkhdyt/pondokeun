import BaseError from './BaseError';

export default class UnauthenticatedError extends BaseError {
	constructor(message: string) {
		super('UNAUTHORIZED', message);
	}
}
