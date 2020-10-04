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
import { Task, TaskState, PriorityType } from '../../models/task.model';
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
    // proirities: Priority[] = priorities;
    priorityTypes = PriorityType;
    displayedColumns = [
        'id',
        'title',
        'description',
        'priority',
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
    onPriorityChage(task: Task) {
        let newPriority = task.priority + 1;
        if (newPriority > 2) {
            newPriority = -1;
        }
        task = {
            ...task,
            priority: newPriority,
        };
        this.tasksService.update(task).subscribe();
        return task;
    }
    getColor(priority) {
        switch (priority) {
            case -1:
                return 'grey';
            case 0:
                return 'green';
            case 1:
                return 'orange';
            case 2:
                return 'red';
        }
    }
    ngOnDestroy() {
        if (this.tasksSubscription) {
            this.tasksSubscription.unsubscribe();
        }
    }
}
