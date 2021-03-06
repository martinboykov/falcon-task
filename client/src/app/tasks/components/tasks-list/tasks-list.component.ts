import {
    Component,
    OnInit,
    OnDestroy,
    ViewChild,
    AfterViewInit,
    Input,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Task, TaskState } from '../../models/task.model';
import { TasksService } from 'src/app/core/services/tasks.service';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromTask from '../../store/task.selector';
@Component({
    selector: 'app-tasks-list',
    templateUrl: './tasks-list.component.html',
    styleUrls: ['./tasks-list.component.scss'],
})
export class TasksListComponent implements OnInit, AfterViewInit, OnDestroy {
    @Input() tasksData: Observable<Task[]>;
    tasks = new MatTableDataSource<Task>();
    tasksSubscription: Subscription;
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
    constructor(private tasksService: TasksService) {}

    ngOnInit() {
        this.tasksData.subscribe((task) => {
            this.tasks.data = task;
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
    onPriorityChage(task) {
        let priority = task.priority + 1;
        if (priority > 2) {
            priority = 0;
        }
        const newTask = {
            ...task,
            priority,
        };
        this.tasksService.update(newTask).subscribe((res) => {
            console.log(res);
        });
        return task;
    }

    getColor(priority) {
        switch (priority) {
            case 0:
                return '';
            case 1:
                return 'accent';
            case 2:
                return 'warn';
            default:
                break;
        }
    }
    ngOnDestroy() {
        if (this.tasksSubscription) {
            this.tasksSubscription.unsubscribe();
        }
    }
}
