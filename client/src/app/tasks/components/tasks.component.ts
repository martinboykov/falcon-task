import { Component, OnInit } from '@angular/core';
import { TasksService } from '../../core/services/tasks.service';

@Component({
    selector: 'app-tasks',
    templateUrl: './tasks.component.html',
    styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
    constructor(private tasksS: TasksService) {}

    ngOnInit(): void {
        this.tasksS.getAll();
    }
}
