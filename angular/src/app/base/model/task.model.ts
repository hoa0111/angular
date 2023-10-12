import {BaseEntity} from "./base.model";
import {Project} from "./project.model";
import {User} from "./user.model";

export class Task extends BaseEntity {
	public static readonly OPEN_STATUS = 1;
	public static readonly IN_PROGRESS_STATUS = 2;
	public static readonly DONE_STATUS = 3;
	public static readonly CANCEL_STATUS = 4;
	public static readonly CLOSE_STATUS = 5;
	name ?: string;
	description ?: string;
	project ?: Project;
	user?: User;
	status ?: number;
	priority ?: number;

	public static getStatus(status: number | undefined): string {
		return TASK_STATUS_LIST.find(item => item.value === status)?.label || '';
	}
}

export const TASK_STATUS = {
	OPEN_STATUS: {value: Task.OPEN_STATUS, label: 'Open'},
	IN_PROGRESS_STATUS: {value: Task.IN_PROGRESS_STATUS, label: 'In Progress'},
	DONE_STATUS: {value: Task.DONE_STATUS, label: 'Done'},
	CANCEL_STATUS: {value: Task.CANCEL_STATUS, label: 'Cancel'},
	CLOSE_STATUS: {value: Task.CLOSE_STATUS, label: 'Close'}
}

export const TASK_STATUS_LIST = Object.entries(TASK_STATUS).map(([key, value]) => value);
