import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {User} from "../../../../base/model/user.model";
import {UserService} from "../../../../base/service/user.service";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";
import {TaskService} from "../../../../base/service/task.service";
import {Project} from "../../../../base/model/project.model";
import {ProjectService} from "../../../../base/service/project.service";

@Component({
	selector: 'app-task-detail',
	templateUrl: './task-detail.component.html',
	styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit {
	form: FormGroup = new FormGroup({});
	userList: User[] = [];
	projectList: Project[] = [];
	id?: number;

	constructor(private fb: FormBuilder,
				private userService: UserService,
				private router: Router,
				private activatedRoute: ActivatedRoute,
				private toastrService: ToastrService,
				private projectService: ProjectService,
				private taskService: TaskService) {
		this.form = this.fb.group({
			id: null,
			name: null,
			description: null,
			project: null,
			user: null,
			status: null,
			priority: null,
		});
	}

	ngOnInit(): void {
		const idParam = this.activatedRoute.snapshot.params['id'];
		if (idParam) {
			this.id = +idParam;
		} else {
			this.id = 0; // Gán giá trị mặc định là 0
		}
		if (this.id !== 0) {
			this.taskService.findById(this.id).subscribe(data => {
				this.form.patchValue(data);
				// @ts-ignore
				this.formControls['project'].setValue(data?.project.id);
				// @ts-ignore
				this.formControls['user'].setValue(data?.user.id);
			})
		}
		this.initUser();
		this.initProject();
	}

	initUser() {
		this.userService.findAll().subscribe(data => {
			this.userList = data;
		})
	}

	initProject() {
		this.projectService.findAll().subscribe(data => {
			this.projectList = data;
		})
	}

	get formControls() {
		return this.form.controls;
	}

	onSubmit() {
		if (this.form.valid) {
			if (this.id !== 0) {
				this.formControls['project'].setValue({id: this.formControls['project'].value});
				this.formControls['user'].setValue({id: this.formControls['user'].value});
				this.taskService.update(this.form.value).subscribe(data => {
					this.toastrService.success('Success', 'Cập nhật thành công');
					this.router.navigateByUrl('task')
				})
			} else {
				this.formControls['project'].setValue({id: this.formControls['project'].value});
				this.formControls['user'].setValue({id: this.formControls['user'].value});
				this.taskService.save(this.form.value).subscribe(data => {
					this.toastrService.success('Success', 'Thêm mới thành công');
					this.router.navigateByUrl('task')
				})
			}
		}
	}
}
