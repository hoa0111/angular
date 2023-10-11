export const BASE_URL = 'http://localhost:9999/api';

export class AuthModel {
	accessToken?: string;
	refreshToken?: string;
}

export class BaseEntity {
	id?: string;
	modifiedDate?: Date;
	createdDate?: Date;
}

export class ErrorException {
	message?: string;
	detail?: string;
	status?: number;
	isError?: boolean;
}

export class PageRequest {
	page?: number;
	size?: number;
}

export class Page<T> {
	content ?: T[];
	totalElements?: number;
	totalPages?: number;
	last?: boolean;
	size?: number;
	number?: number;
	sort?: string;
	numberOfElements?: number;
	first?: boolean;
}
