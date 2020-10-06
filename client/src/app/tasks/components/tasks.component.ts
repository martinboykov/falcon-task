import { Component, OnInit, OnDestroy } from '@angular/core';
import { Task } from '../models/task.model';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromTask from '../store/task.selector';
@Component({
    selector: 'app-tasks',
    templateUrl: './tasks.component.html',
    styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit, OnDestroy {
    tasksSubscription: Subscription;
    projectsSubscription: Subscription;
    tasks: Observable<Task[]>;

    constructor(private storeTasks: Store<fromTask.State>) {}

    ngOnInit() {
        this.tasks = this.storeTasks.select(fromTask.getTasks);
    }
    ngOnDestroy() {
        if (this.tasksSubscription) {
            this.tasksSubscription.unsubscribe();
        }
        if (this.projectsSubscription) {
            this.projectsSubscription.unsubscribe();
        }
    }
}
