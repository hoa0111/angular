import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../base/service/user.service";
import {User} from "../../../base/model/user.model";

@Component({
	selector: 'app-project',
	templateUrl: './user.component.html',
	styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
	userList: User[] = [];
	isLoading = false;

	constructor(private userService: UserService) {

	}

	ngOnInit(): void {
		this.loadUser();
	}

	loadUser() {
		this.isLoading = true;
		this.userService.findAll().subscribe(data => {
			this.userList = data;
			this.isLoading = false;
		});
	}
}
