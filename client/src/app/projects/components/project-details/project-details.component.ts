import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription, Observable, of, EMPTY } from 'rxjs';
import { Store } from '@ngrx/store';
import { ProjectsService } from 'src/app/core/services/projects.service';
import { Project } from '../../models/project.model';
import * as fromProject from '../../store/project.selector';
import { Task } from 'src/app/tasks/models/task.model';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { map, switchMap, tap } from 'rxjs/operators';
@Component({
    selector: 'app-project-details',
    templateUrl: './project-details.component.html',
    styleUrls: ['./project-details.component.scss'],
})
export class ProjectDetailsComponent implements OnInit, OnDestroy {
    $project: Observable<Project>;
    $tasks: Observable<Task[]>;
    projectsSubscription: Subscription;
    id: string;
    isTasks = false;
    isProject = true;
    constructor(
        private projectsService: ProjectsService,
        private store: Store<fromProject.State>,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit() {
        this.id = this.route.snapshot.paramMap.get('id');
        this.$tasks = this.store
            .select(fromProject.getProject, {
                id: this.id,
            })
            .pipe(
                map((project) => {
                        return project.tasks;
                })
            );
        this.$project = this.store
            .select(fromProject.getProject, {
                id: this.id,
            })
    }


    ngOnDestroy() {
        if (this.projectsSubscription) {
            this.projectsSubscription.unsubscribe();
        }
    }
}
