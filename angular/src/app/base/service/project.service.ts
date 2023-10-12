import {BaseService} from "./base/base.service";
import {BASE_URL} from "../model/base.model";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Project} from "../model/project.model";

@Injectable({providedIn: 'root'})
export class ProjectService implements BaseService<Project> {
	public url = BASE_URL + '/project';

	constructor(private http: HttpClient) {

	}

	delete(id: number): Observable<void> {
		return this.http.delete<void>(this.url + '/' + id, {headers: this.getHeader()});
	}

	findAll(): Observable<Project[]> {
		return this.http.get<Project[]>(this.url + '/findAll', {headers: this.getHeader()});
	}

	findById(id: number): Observable<Project> {
		return this.http.get<Project>(this.url + '/' + id, {headers: this.getHeader()});
	}

	save(t: Project): Observable<Project> {
		return this.http.post<Project>(this.url + '/save', t, {headers: this.getHeader()});
	}

	update(t: Project): Observable<Project> {
		return this.http.put<Project>(this.url + '/update', t, {headers: this.getHeader()});
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
