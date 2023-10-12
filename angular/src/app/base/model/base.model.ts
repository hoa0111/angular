import {User} from "./user.model";

export const BASE_URL = 'http://localhost:9999/api';

export class AuthModel {
	accessToken?: string;
	refreshToken?: string;
	username ?: string;
}

export class BaseEntity {
	id?: number;
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
