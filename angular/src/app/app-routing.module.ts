import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
	{path: '', redirectTo: 'home', pathMatch: 'full'},
	{path: 'login', loadChildren: () => import('./page/login/login.module').then(m => m.LoginModule)},
	{path: 'register', loadChildren: () => import('./page/register/register.module').then(m => m.RegisterModule)},
	{path: 'home', loadChildren: () => import('./page/home/home.module').then(m => m.HomeModule)},
	{path: 'project', loadChildren: () => import('./page/admin/project/project.module').then(m => m.ProjectModule)},
	{path: 'task', loadChildren: () => import('./page/admin/task/task.module').then(m => m.TaskModule)},
	{path: 'user', loadChildren: () => import('./page/admin/user/user.module').then(m => m.UserModule)},
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes)
	],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
