import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgxCaptchaModule} from "ngx-captcha";
import {ProjectComponent} from "./project.component";
import {SpinnerModule} from "../../../component/spinner/spinner.module";
import {ProjectDetailComponent} from './project-detail/project-detail.component';
import {NgSelectModule} from "@ng-select/ng-select";

const routes: Routes = [
	{path: '', component: ProjectComponent},
	{path: 'add', component: ProjectDetailComponent},
	{path: ':id', component: ProjectDetailComponent},
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
		ProjectComponent,
		ProjectDetailComponent
	],
	providers: [],
})
export class ProjectModule {
}
