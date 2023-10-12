import {BaseService} from "./base/base.service";
import {BASE_URL} from "../model/base.model";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Task} from "../model/task.model";

@Injectable({providedIn: 'root'})
export class TaskService implements BaseService<Task> {
	public url = BASE_URL + '/task';

	constructor(private http: HttpClient) {

	}

	delete(id: number): Observable<void> {
		return this.http.delete<void>(this.url + '/' + id, {headers: this.getHeader()});
	}

	findAll(): Observable<Task[]> {
		return this.http.get<Task[]>(this.url + '/findAll', {headers: this.getHeader()});
	}

	findById(id: number): Observable<Task> {
		return this.http.get<Task>(this.url + '/' + id, {headers: this.getHeader()});
	}

	save(t: Task): Observable<Task> {
		return this.http.post<Task>(this.url + '/save', t, {headers: this.getHeader()});
	}

	update(t: Task): Observable<Task> {
		return this.http.put<Task>(this.url + '/update', t, {headers: this.getHeader()});
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
