import { Injectable } from '@angular/core';
import {
    Resolve,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
} from '@angular/router';

import { ProjectsService } from '../core/services/projects.service';
import { of } from 'rxjs';
import * as fromProject from './store/project.selector';
import { Store } from '@ngrx/store';
import { switchMap, take } from 'rxjs/operators';
import { Project } from './models/project.model';

@Injectable({ providedIn: 'root' })
export class ProjectsResolverService implements Resolve<Project[]> {
    constructor(
        private projectsService: ProjectsService,
        private store: Store<fromProject.State>
    ) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.store.select(fromProject.getProjects).pipe(
            take(1),
            switchMap((projects: Project[]) => {
                if (projects.length === 0) {
                    return this.projectsService.getAll();
                } else {
                    return of(projects);
                }
            })
        );
    }
}
