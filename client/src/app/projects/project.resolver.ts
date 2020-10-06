import { Injectable } from '@angular/core';
import {
    Resolve,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
} from '@angular/router';

import { ProjectsService } from '../core/services/projects.service';
import { of, EMPTY } from 'rxjs';
import * as fromProject from './store/project.selector';
import { Store } from '@ngrx/store';
import { switchMap, take } from 'rxjs/operators';
import { Project } from './models/project.model';

@Injectable({ providedIn: 'root' })
export class ProjectResolverService implements Resolve<Project> {
    constructor(
        private projectsService: ProjectsService,
        private store: Store<fromProject.State>
    ) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id: string = route.params.id;
        if (!id) {
            return EMPTY;
        }
        return this.store.select(fromProject.getProject, { id }).pipe(
            take(1),
            switchMap((project: Project) => {
                if (!project) {
                    return this.projectsService.getById(id);
                } else {
                    return of(project);
                }
            })
        );
    }
}
