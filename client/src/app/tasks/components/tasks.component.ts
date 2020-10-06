import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TasksService } from 'src/app/core/services/tasks.service';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromTask from './../store/task.selector';
import { Task } from '../models/task.model';
import { tap, map } from 'rxjs/operators';
@Component({
    selector: 'app-tasks',
    templateUrl: './tasks.component.html',
    styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
    tasks: Observable<Task[]>;
    lowPriorTasks: Observable<Task[]>;
    mediumPriorTasks: Observable<Task[]>;
    highPriorTasks: Observable<Task[]>;
    tasksSubscription: Subscription;
    constructor(
        private route: ActivatedRoute,
        private store: Store<fromTask.State>
    ) {}
    ngOnInit() {
        this.tasks = this.store.select(fromTask.getTasks);
        this.lowPriorTasks = this.store.select(fromTask.getTasks).pipe(
            map((tasks) => {
                return tasks.filter((task) => task.priority === 0);
            })
        );
        this.mediumPriorTasks = this.store.select(fromTask.getTasks).pipe(
            map((tasks) => {
                return tasks.filter((task) => task.priority === 1);
            })
        );
        this.highPriorTasks = this.store.select(fromTask.getTasks).pipe(
            map((tasks) => {
                return tasks.filter((task) => task.priority === 2);
            })
        );
    }
}
