import { Injectable } from '@angular/core';
import {
    Resolve,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
} from '@angular/router';

import { TasksService } from '../core/services/tasks.service';
import { of } from 'rxjs';
import * as fromTask from './store/task.selector';
import { Store } from '@ngrx/store';
import { switchMap, take } from 'rxjs/operators';
import { Task } from './models/task.model';

@Injectable({ providedIn: 'root' })
export class TasksResolverService implements Resolve<Task[]> {
    constructor(
        private tasksService: TasksService,
        private store: Store<fromTask.State>
    ) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.store.select(fromTask.getTasks).pipe(
            take(1),
            switchMap((tasks: Task[]) => {
                if (tasks.length === 0) {
                    return this.tasksService.getAll();
                } else {
                    return of(tasks);
                }
            })
        );
    }
}
