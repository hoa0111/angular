import {BaseEntity} from "./base.model";

export class User extends BaseEntity{
	username?: string;
	password?: string;
	email?: string;
	lever?: number;
	status?: number;

	public static isLogin(): boolean {
		return localStorage.getItem('isLogin') === 'true' && localStorage.getItem('token') !== null;
	}
}

export class AuthRequest {
	username?: string;
	password?: string;
	rememberMe?: boolean;
}

export interface RouterData {
	showHeader?: boolean;
	showFooter?: boolean;
	showSidebar?: boolean;
	showNavbar?: boolean;
}
