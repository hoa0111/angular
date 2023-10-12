import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Project} from "../../../../base/model/project.model";
import {ProjectService} from "../../../../base/service/project.service";
import {User} from "../../../../base/model/user.model";
import {UserService} from "../../../../base/service/user.service";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
	selector: 'app-project-detail',
	templateUrl: './project-detail.component.html',
	styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit{
	form: FormGroup = new FormGroup({});
	userList: User[] = [];
	id?: number;

	constructor(private fb: FormBuilder,
				private userService: UserService,
				private router: Router,
				private activatedRoute: ActivatedRoute,
				private toastrService: ToastrService,
				private projectService: ProjectService) {
		this.form = this.fb.group({
			id: null,
			name: null,
			leader: null,
			startDate: null,
			money: 0,
		});
	}

	ngOnInit(): void {
		this.initUser();
	}

	initUser(){
		this.id = +this.activatedRoute.snapshot.params['id'];
		if (this.id !== 0) {
			this.projectService.findById(this.id).subscribe(data => {
				this.form.patchValue(data);
				// @ts-ignore
				this.formControls['leader'].setValue(data?.leader.id);
			})
		}
		this.userService.findAll().subscribe(data => {
			this.userList = data;
		})
	}

	get formControls() {
		return this.form.controls;
	}

	onSubmit() {
		if (this.form.valid) {
			if (this.id !== 0 ) {
				this.formControls['leader'].setValue({id: this.formControls['leader'].value});
				this.projectService.update(this.form.value).subscribe(data => {
					this.toastrService.success('Success', 'Cập nhật thành công');
					this.router.navigateByUrl('project')
				})
			} else {
				this.formControls['leader'].setValue({id: this.formControls['leader'].value});
				this.projectService.save(this.form.value).subscribe(data => {
					this.toastrService.success('Success', 'Thêm mới thành công');
					this.router.navigateByUrl('project')
				})
			}
		}
	}
}
