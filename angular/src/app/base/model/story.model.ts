import {BaseEntity, PageRequest} from "./base.model";
import {Category} from "./category.model";

export class Story extends BaseEntity{
	title?: string;
	imageUrl?: string;
	description?: string;
	name?: string;
	category?:Category;
	likeCount?: number;
	viewCount?: number;
}

export class StoryResponse extends Story {
	chapterCount?: number;
}

export class StoryRequest extends PageRequest{
	keyword? : string;
	sortBy? : string;
	categoryId? : number;
}
