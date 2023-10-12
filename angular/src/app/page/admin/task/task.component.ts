import {Component, OnInit} from '@angular/core';
import {TaskService} from "../../../base/service/task.service";
import {Task, TASK_STATUS} from "../../../base/model/task.model";

@Component({
	selector: 'app-task',
	templateUrl: './task.component.html',
	styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
	taskList: Task[] = [];
	isLoading = false;
	TASK_STATUS = TASK_STATUS;
	Task = Task;

	constructor(private taskService: TaskService) {

	}

	ngOnInit(): void {
		this.loadTask();
	}

	loadTask() {
		this.isLoading = true;
		this.taskService.findAll().subscribe(data => {
			this.taskList = data;
			this.isLoading = false;
		});
	}

	delete(task: Task | undefined) {
		if(confirm('Bạn có chắc muốn xóa nhiệm vụ :' + task?.name)) {
			if (task && task.id) {
				this.taskService.delete(task.id).subscribe(() => {
					this.loadTask();
				})
			}
		}
	}

	getBadgeClass(status: number | undefined) {
		if (status === TASK_STATUS.OPEN_STATUS.value) {
			return 'badge text-bg-secondary';
		} else if (status === TASK_STATUS.IN_PROGRESS_STATUS.value) {
			return 'badge text-bg-primary';
		} else if (status === TASK_STATUS.DONE_STATUS.value) {
			return 'badge text-bg-success';
		} else if (status === TASK_STATUS.CLOSE_STATUS.value) {
			return 'badge text-bg-danger';
		} else if (status === TASK_STATUS.CANCEL_STATUS.value) {
			return 'badge text-bg-warning';
		}
		return '';
	}
}
