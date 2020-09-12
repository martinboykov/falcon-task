import { Component, OnInit, OnDestroy } from '@angular/core';
import { Task } from '../../models/task.model';
import { Validators, FormBuilder } from '@angular/forms';
import { TasksService } from 'src/app/core/services/tasks.service';
import { ActivatedRoute, Data } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
    selector: 'app-task-edit',
    templateUrl: './task-edit.component.html',
    styleUrls: ['./task-edit.component.scss'],
})
export class TaskEditComponent implements OnInit, OnDestroy {
    task: Task;
    taskSubscription: Subscription;
    id: string;
    editMode: boolean;
    success: boolean;
    taskForm = this.fb.group({
        title: ['', [Validators.required, Validators.maxLength(60)]],
        description: ['', [Validators.required, Validators.maxLength(100)]],
    });

    constructor(
        private tasksService: TasksService,
        private fb: FormBuilder,
        private route: ActivatedRoute
    ) {}
    get title() {
        return this.taskForm.get('title');
    }
    get description() {
        return this.taskForm.get('description');
    }
    public hasError = (controlName: string, errorName: string) => {
        return this.taskForm.controls[controlName].hasError(errorName);
    }
    ngOnInit(): void {
        this.success = false;
        this.id = this.route.snapshot.paramMap.get('id');
        if (this.id) {
            this.editMode = true;
            this.taskSubscription = this.route.data.subscribe((res: Data) => {
                if (this.editMode) {
                    this.task = res.data;
                    this.taskForm.patchValue({
                        title: this.task.title,
                        description: this.task.description,
                    });
                }
            });
        } else {
            this.editMode = false;
        }
    }

    onSubmit() {
        this.tasksService.add(this.taskForm.value).subscribe(() => {
            this.success = true;
        });
    }
    onEditTask() {
        this.task = {
            ...this.task,
            ...this.taskForm.value,
        };

        this.taskSubscription.add(
            this.tasksService.update(this.task).subscribe(() => {
                this.success = true;
            })
        );
    }
    ngOnDestroy() {
        if (this.taskSubscription) {
            this.taskSubscription.unsubscribe();
        }
    }
}
