import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgxCaptchaModule} from "ngx-captcha";
import {TaskComponent} from "./task.component";
import {SpinnerModule} from "../../../component/spinner/spinner.module";
import {TaskDetailComponent} from './task-detail/task-detail.component';
import {NgSelectModule} from "@ng-select/ng-select";

const routes: Routes = [
	{path: '', component: TaskComponent},
	{path: 'add', component: TaskDetailComponent},
	{path: ':id', component: TaskDetailComponent},
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
		TaskComponent,
		TaskDetailComponent
	],
	providers: [],
})
export class TaskModule {
}
