import { AfterViewInit, Component, OnInit } from '@angular/core';
import { DataStorageService } from './base/service/base/data-storage.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, AfterViewInit {
	public showNavbar: boolean = true;
	public showMenu: boolean = true;

	constructor(private dataStorageService: DataStorageService) {}

	ngOnInit(): void {
		// Thiết lập giá trị mặc định cho showHeader tại đây
	}

	ngAfterViewInit(): void {
		this.initUI();
	}

	initUI() {
		this.dataStorageService.showMenuChange.subscribe((val) => {
			this.showMenu = val;
		});
		this.dataStorageService.showNavbarChange.subscribe((val) => {
			this.showNavbar = val;
		});
	}
}
