import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SpinnerModule} from "../../component/spinner/spinner.module";
import {NgxCaptchaModule} from "ngx-captcha";
import {HomeComponent} from "./home.component";

const routes: Routes = [
	{path: '', component: HomeComponent},
];

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		FormsModule,
		ReactiveFormsModule,
		SpinnerModule,
		NgxCaptchaModule,
	],
	declarations: [
		HomeComponent
	],
	providers: [],
})
export class HomeModule {
}
