type StatusCode =
	| 'PARSE_ERROR'
	| 'BAD_REQUEST'
	| 'INTERNAL_SERVER_ERROR'
	| 'UNAUTHORIZED'
	| 'FORBIDDEN'
	| 'NOT_FOUND'
	| 'METHOD_NOT_SUPPORTED'
	| 'TIMEOUT'
	| 'CONFLICT'
	| 'PRECONDITION_FAILED'
	| 'PAYLOAD_TOO_LARGE'
	| 'TOO_MANY_REQUESTS'
	| 'CLIENT_CLOSED_REQUEST';

export default class BaseError extends Error {
	statusCode: StatusCode;

	constructor(statusCode: StatusCode, message: string) {
		super(message);
		this.statusCode = statusCode;
	}
}
