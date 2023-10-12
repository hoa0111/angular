import {BaseEntity} from "./base.model";
import {User} from "./user.model";
import {Task} from "./task.model";

export class Project extends BaseEntity {
	name ?: string;
	startDate ?: Date;
	money ?: number;
	leader ?: User;
	memberList ?: User[];
	taskList ?: Task[];
	memberCount ?: number;
}
