import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class DataStorageService {
	showNavbarChange: EventEmitter<any> = new EventEmitter();
	showNavbar: any;
	showMenuChange: EventEmitter<any> = new EventEmitter();
	showMenu: any;

	get navbar(): any {
		return this.showNavbar;
	}

	set navbar(val: any) {
		this.showNavbar = val;
		this.showNavbarChange.emit(val);
	}

	get menu(): any {
		return this.showMenu;
	}

	set menu(val: any) {
		this.showMenu = val;
		this.showMenuChange.emit(val);
	}
}
