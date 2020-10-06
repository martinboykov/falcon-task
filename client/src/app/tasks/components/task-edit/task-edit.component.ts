import { Component, OnInit, OnDestroy } from '@angular/core';
import { Task, PriorityType } from '../../models/task.model';
import { Validators, FormBuilder } from '@angular/forms';
import { TasksService } from 'src/app/core/services/tasks.service';
import { ActivatedRoute, Data } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProjectsService } from 'src/app/core/services/projects.service';
import * as fromProject from '../../../projects/store/project.selector';
import { Store } from '@ngrx/store';
import { Project } from '../../../projects/models/project.model';
import { switchMap } from 'rxjs/operators';
import { Location } from '@angular/common';
@Component({
    selector: 'app-task-edit',
    templateUrl: './task-edit.component.html',
    styleUrls: ['./task-edit.component.scss'],
})
export class TaskEditComponent implements OnInit, OnDestroy {
    task: Task;
    isProject = false;
    taskSubscription: Subscription;
    id: string;
    editMode: boolean;
    success: boolean;
    priorityTypes = PriorityType;
    taskForm = this.fb.group({
        title: ['', [Validators.required, Validators.maxLength(60)]],
        description: ['', [Validators.required, Validators.maxLength(100)]],
        priority: ['-1'],
    });
    constructor(
        private tasksService: TasksService,
        private projectsSetvice: ProjectsService,
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private store: Store<fromProject.State>,
        private location: Location
    ) {}
    get title() {
        return this.taskForm.get('title');
    }
    get description() {
        return this.taskForm.get('description');
    }
    get priority() {
        return this.taskForm.get('priority');
    }
    public hasError = (controlName: string, errorName: string) => {
        return this.taskForm.controls[controlName].hasError(errorName);
    };
    ngOnInit(): void {
        this.success = false;
        this.id = this.route.snapshot.paramMap.get('id');
        this.isProject = this.route.snapshot?.url[0]?.path === 'projects';
        if (this.id && !this.isProject) {
            this.editMode = true;
            this.taskSubscription = this.route.data.subscribe((res: Data) => {
                console.log('res: Data: ', res);

                if (this.editMode) {
                    this.task = res.task;
                    console.log(this.task);

                    this.taskForm.patchValue({
                        title: this.task.title,
                        description: this.task.description,
                        priority: this.task.priority,
                    });
                }
            });
        } else {
            console.log('edit');

            this.editMode = false;
        }
    }
    goBack() {
        this.location.back();
    }
    onSubmit() {
        const newTask = this.taskForm.value;
        if (this.id) {
            newTask.project = this.id;
            console.log(newTask);
        }
        this.tasksService.add(newTask).subscribe(() => {
            this.success = true;
        });
    }
    onEditTask() {
        this.task = {
            ...this.task,
            ...this.taskForm.value,
        };
        console.log(this.task);

        this.tasksService.update(this.task).subscribe(() => {
            this.success = true;
        });
    }
    ngOnDestroy() {
        if (this.taskSubscription) {
            this.taskSubscription.unsubscribe();
        }
    }
}
