import {BASE_URL} from "../model/base.model";
import {HttpClient} from "@angular/common/http";
import {BaseService} from "./base/base.service";
import {User} from "../model/user.model";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
@Injectable({providedIn: 'root'})
export class UserService implements BaseService<User> {
	public url = BASE_URL + '/user';

	constructor(private http: HttpClient) {
	}

	findAll(): Observable<User[]> {
		return this.http.get<User[]>(this.url + '/findAll');
	}

	findById(id: number): Observable<User> {
		return this.http.get<User>(this.url + '/' + id);
	}

	save(t: User): Observable<User> {
		return this.http.post<User>(`${this.url}/save`, t, {headers: this.getHeader()});
	}

	create(t: User): Observable<User> {
		return this.http.post<User>(`${this.url}/create`, t, {headers: this.getHeader()});
	}

	update(t: User): Observable<User> {
		return this.http.put<User>(this.url + '/' + t.id, t, {headers: this.getHeader()});
	}

	delete(id: number): Observable<void> {
		return this.http.delete<void>(this.url + '/' + id);
	}

	private getHeader(){
		const token = localStorage.getItem('token');
		if (token) {
			const headers = {Authorization: 'Bearer ' + token};
			return headers;
		}
		return {};
	}
}
