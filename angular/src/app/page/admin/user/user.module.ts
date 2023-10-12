import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgxCaptchaModule} from "ngx-captcha";
import {UserComponent} from "./user.component";
import {SpinnerModule} from "../../../component/spinner/spinner.module";
import {UserDetailComponent} from './user-detail/user-detail.component';
import {NgSelectModule} from "@ng-select/ng-select";

const routes: Routes = [
	{path: '', component: UserComponent},
	{path: 'add', component: UserDetailComponent},
	{path: ':id', component: UserDetailComponent},
];

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		FormsModule,
		ReactiveFormsModule,
		SpinnerModule,
		NgxCaptchaModule,
		NgSelectModule
	],
	declarations: [
		UserComponent,
		UserDetailComponent
	],
	providers: [],
})
export class UserModule {
}
