import {BASE_URL, Page} from "../model/base.model";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {StoryRequest, StoryResponse} from "../model/story.model";

@Injectable({providedIn: 'root'})
export class StoryService {
	public url = BASE_URL + '/story';
	public urlV2 = BASE_URL + '/v2/story';

	constructor(private http: HttpClient) {

	}

	findBySearch(model : StoryRequest){
		return this.http.post<Page<StoryResponse>>(`${this.urlV2}/findBySearch`,model);
	}
}
