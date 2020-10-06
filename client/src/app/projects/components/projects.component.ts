import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { ProjectsService } from 'src/app/core/services/projects.service';
import { Project } from '../models/project.model';
import * as fromProject from '../store/project.selector';
import { map } from 'rxjs/operators';
@Component({
    selector: 'app-projects',
    templateUrl: './projects.component.html',
    styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
    projects: Observable<Project[]>;
    projectsSubscription: Subscription;
    constructor(
        private projectsService: ProjectsService,
        private store: Store<fromProject.State>
    ) {}

    ngOnInit() {
        this.projects = this.store.select(fromProject.getProjects);
    }
}
