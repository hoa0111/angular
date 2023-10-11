import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../base/service/auth.service";
import {ToastrService} from "ngx-toastr";
import {DataStorageService} from "../../base/service/base/data-storage.service";
import {ErrorException} from "../../base/model/base.model";

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	public formSubmitted = false;
	public form: FormGroup;
	public isLoading = false;
	public readonly SITE_KEY = '6LfGY8InAAAAAJa5wYYTrGpQpplpcNe-G2kedFcZ';
	public isReloadCaptcha = false;

	constructor(private fb: FormBuilder,
				private router: Router,
				private toastrService: ToastrService,
				private activatedRoute: ActivatedRoute,
				private dataStorageService: DataStorageService,
				private authService: AuthService) {
		this.form = this.fb.group({
			username: [null, Validators.compose([Validators.required, Validators.maxLength(20)])],
			password: [null, Validators.compose([Validators.required, Validators.maxLength(20)])],
			rememberMe: false,
			recaptcha: [null,]
		})
		this.dataStorageService.navbar = false;
		this.dataStorageService.menu = false;
	}

	get formControls() {
		return this.form.controls;
	}

	ngOnInit() {
		this.reloadGoogleCaptcha();
	}

	onSubmit(): void {
		this.formSubmitted = true;
		if (this.form.invalid) {
			return;
		}
		this.isLoading = true;
		this.authService.auth(this.form.value).subscribe(data => {
			if (data) {
				if (data?.accessToken || data?.refreshToken) {
					localStorage.setItem('token', <string>data.accessToken || <string>data.refreshToken);
					localStorage.setItem('isLogin', 'true');
					this.toastrService.success('Đăng nhập thành công', 'Thành công');
					this.router.navigateByUrl('/home');
					this.isLoading = false;
				} else {
					const error = data as ErrorException;
					this.toastrService.error(error.detail, 'Lỗi');
					this.isLoading = false;
				}
			}
		});
	}

	reloadGoogleCaptcha() {
		const scriptElement = document.createElement('script');
		scriptElement.src = 'https://www.google.com/recaptcha/api.js?render=explicit&hl=vi';
		scriptElement.async = true;
		scriptElement.defer = true;
		document.body.appendChild(scriptElement);
		this.isReloadCaptcha = true;
	}

	handleReset() {
		this.form.reset();
		this.reloadGoogleCaptcha();
	}

	handleExpire() {
		this.formControls['recaptcha'].setErrors({expired: true});
		this.reloadGoogleCaptcha();
	}

	handleLoad() {
		this.isReloadCaptcha = false;
	}

	handleSuccess($event: any) {
		this.formControls['recaptcha'].setValue($event);
	}

}
