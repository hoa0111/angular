import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ToastrModule} from "ngx-toastr";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {NgSelectModule} from '@ng-select/ng-select';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {NgbDatepickerModule, NgbDropdownModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {SpinnerModule} from "./component/spinner/spinner.module";
import {AuthConfig} from "./base/config/auth.config";
import {SidebarComponent} from './component/sidebar/sidebar.component';
import {NavbarComponent} from './component/navbar/navbar.component';

@NgModule({
	declarations: [
		AppComponent,
		SidebarComponent,
		NavbarComponent
	],
	imports: [
		CommonModule,
		BrowserModule,
		AppRoutingModule,
		NgSelectModule,
		NgbDropdownModule,
		FormsModule,
		NgbDatepickerModule,
		ButtonModule,
		NgbModule,
		HttpClientModule,
		TableModule,
		ReactiveFormsModule,
		ToastrModule.forRoot({
			timeOut: 5000,
			positionClass: 'toast-top-right',
			preventDuplicates: true,
			closeButton: true,
			progressBar: true,
			maxOpened: 5,
			autoDismiss: true,
			enableHtml: true,
			newestOnTop: true,
			onActivateTick: true,
			resetTimeoutOnDuplicate: true,
			tapToDismiss: true,
			titleClass: 'toast-title',
			messageClass: 'toast-message',
			iconClasses: {
				error: 'toast-error',
				info: 'toast-info',
				success: 'toast-success',
				warning: 'toast-warning',
			}
		}),
		BrowserAnimationsModule,
		SpinnerModule
	],
	providers: [
		{provide: HTTP_INTERCEPTORS, useClass: AuthConfig, multi: true},
	],
	exports: [
	],
	bootstrap: [AppComponent]
})
export class AppModule {
}
