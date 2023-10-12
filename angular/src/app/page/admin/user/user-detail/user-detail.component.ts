import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {User} from "../../../../base/model/user.model";
import {UserService} from "../../../../base/service/user.service";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
	selector: 'app-project-detail',
	templateUrl: './user-detail.component.html',
	styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
	form: FormGroup = new FormGroup({});
	userList: User[] = [];
	id?: number;

	constructor(private fb: FormBuilder,
				private userService: UserService,
				private router: Router,
				private activatedRoute: ActivatedRoute,
				private toastrService: ToastrService) {
		this.form = this.fb.group({
			id: null,
			username: null,
			password: null,
			email: null,
		});
	}

	ngOnInit(): void {
		this.initUser();
	}

	initUser() {
		const idParam = this.activatedRoute.snapshot.params['id'];
		if (idParam) {
			this.id = +idParam;
		} else {
			this.id = 0; // Gán giá trị mặc định là 0
		}
		if (this.id !== 0) {
			this.userService.findById(this.id).subscribe(data => {
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
			if (this.id !== 0) {
				this.userService.update(this.form.value).subscribe(data => {
					this.toastrService.success('Success', 'Cập nhật thành công');
					this.router.navigateByUrl('user')
				})
			} else {
				this.userService.create(this.form.value).subscribe(data => {
					this.toastrService.success('Success', 'Thêm mới thành công');
					this.router.navigateByUrl('user')
				})
			}
		}
	}
}
