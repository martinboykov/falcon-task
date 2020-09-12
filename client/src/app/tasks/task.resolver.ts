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
export class TaskResolverService implements Resolve<Task> {
    constructor(
        private tasksService: TasksService,
        private store: Store<fromTask.State>
    ) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id: string = route.params.id;

        return this.store.select(fromTask.getTask, { id }).pipe(
            take(1),
            switchMap((task: Task) => {
                if (!task) {
                    console.log(task);

                    return this.tasksService.getById(id);
                } else {
                    console.log('emty');

                    return of(task);
                }
            })
        );
    }
}
