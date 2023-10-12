import { Component } from '@angular/core';
import {User} from "../../base/model/user.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
	User = User;
	username?: string;
	constructor() {
		this.username = localStorage.getItem('username') || '';
	}
}
