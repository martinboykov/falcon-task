import {
    Component,
    OnInit,
    OnDestroy,
    ViewChild,
    AfterViewInit,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Task, TaskState } from '../../models/task.model';
import { TasksService } from 'src/app/core/services/tasks.service';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromTask from '../../store/task.selector';
@Component({
    selector: 'app-tasks-list',
    templateUrl: './tasks-list.component.html',
    styleUrls: ['./tasks-list.component.scss'],
})
export class TasksListComponent implements OnInit, AfterViewInit, OnDestroy {
    tasks = new MatTableDataSource<Task>();
    tasksSubscription: Subscription;
    displayedColumns = [
        'id',
        'title',
        'description',
        'state',
        'update',
        'delete',
    ];
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    constructor(
        private tasksService: TasksService,
        private store: Store<fromTask.State>
    ) {}

    ngOnInit() {
        this.tasksSubscription = this.store
            .select(fromTask.getTasks)
            .subscribe((tasks) => {
                this.tasks.data = tasks;
            });
    }
    ngAfterViewInit() {
        this.tasks.sort = this.sort;
        this.tasks.paginator = this.paginator;
    }

    doFilter(value: string) {
        this.tasks.filter = value.trim().toLowerCase();
    }
    onDelete(id: string) {
        this.tasksService.delete(id).subscribe();
    }
    onStateChage(task: Task) {
        if (task.state === TaskState.started) {
            task = {
                ...task,
                state: TaskState.completed,
            };
        } else {
            task = {
                ...task,
                state: TaskState.started,
            };
        }
        this.tasksService.update(task).subscribe();
        return task;
    }
    ngOnDestroy() {
        if (this.tasksSubscription) {
            this.tasksSubscription.unsubscribe();
        }
    }
}
