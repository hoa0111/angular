import {BaseEntity} from "./base.model";

export class UserAction extends BaseEntity {
	action?: string;
	description?: string;
	ipAddress?: string;
	userAgent?: string;
	method?: string;
	path?: string;
	params?: string;
	body?: string;
	objectType?: string;
	objectId?: number;
	objectUid?: string;
	userId?: number;
}
