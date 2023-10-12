import {Component, OnInit} from '@angular/core';
import {ProjectService} from "../../../base/service/project.service";
import {Project} from "../../../base/model/project.model";

@Component({
	selector: 'app-project',
	templateUrl: './project.component.html',
	styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
	projectList: Project[] = [];
	isLoading = false;

	constructor(private projectService: ProjectService) {

	}

	ngOnInit(): void {
		this.loadProject();
	}

	loadProject() {
		this.isLoading = true;
		this.projectService.findAll().subscribe(data => {
			this.projectList = data;
			this.isLoading = false;
		});
	}

	delete(project: Project | undefined) {
		if(confirm('Bạn có chắc muốn xóa dự án :' + project?.name)) {
			if (project && project.id) {
				this.projectService.delete(project.id).subscribe(() => {
					this.loadProject();
				})
			}
		}
	}
}
