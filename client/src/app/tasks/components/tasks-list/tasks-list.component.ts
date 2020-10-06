import {
    Component,
    OnInit,
    ViewChild,
    AfterViewInit,
    Input,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Task, TaskState, PriorityType } from '../../models/task.model';
import { TasksService } from 'src/app/core/services/tasks.service';
import { Project } from 'src/app/projects/models/project.model';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-tasks-list',
    templateUrl: './tasks-list.component.html',
    styleUrls: ['./tasks-list.component.scss'],
})
export class TasksListComponent implements OnInit, AfterViewInit {
    @Input() $tasks: Observable<Task[]>;
    @Input() project: Project[];
    tasks = new MatTableDataSource<Task>();
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
    constructor(private tasksService: TasksService) {}

    ngOnInit() {
        this.$tasks.subscribe((data) => {
            this.tasks.data = data;
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
}
