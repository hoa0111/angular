import {BASE_URL} from "../model/base.model";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";

@Injectable({providedIn: 'root'})
export class UserActionService {
	public urlV2 = BASE_URL + '/v2/user-action';

	constructor(private http: HttpClient) {

	}

	like(storyUid: string) {
		return this.http.post(`${this.urlV2}/like?storyUid=${storyUid}`, {});
	}
}
