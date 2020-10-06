import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Task, TaskState } from 'src/app/tasks/models/task.model';
import { tap, switchMap, concatMap, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NotificationService } from './notification.service';
import * as TaskAction from '../../tasks/store/task.actions';
import * as fromTask from '../../tasks/store/task.reducer';
import * as ProjectAction from '../../projects/store/project.actions';
import * as fromProject from '../../projects/store/project.reducer';
import { Store } from '@ngrx/store';
import { Project } from 'src/app/projects/models/project.model';
const urlTasks = environment.apiUrl + '/tasks';

@Injectable({
    providedIn: 'root',
})
export class TasksService {
    constructor(
        private http: HttpClient,
        private router: Router,
        private notifier: NotificationService,
        private storeTask: Store<fromTask.TasksState>,
        private storeProject: Store<fromProject.ProjectsState>
    ) {}

    getAll(): Observable<Task[]> {
        return this.http
            .get<Task[]>(urlTasks, {
                params: new HttpParams(),
            })
            .pipe(
                tap((res: Task[]) => {
                    this.storeTask.dispatch(new TaskAction.GetTasks(res));
                    if (res.length !== 0) {
                        this.notifier.showInfo('Tasks loaded successfully');
                    }
                })
            );
    }
    getById(id: string): Observable<Task> {
        return this.http.get<Task>(urlTasks + `/${id}`).pipe(
            tap((res: Task) => {
                this.notifier.showInfo('Task loaded successfully');
                if (res) {
                    this.notifier.showInfo('Tasks loaded successfully');
                }
            })
        );
    }
    add(task: Task) {
        const newTask = {
            ...task,
            state: TaskState.started,
        };
        return this.http.post<Task>(urlTasks, newTask).pipe(
            map((res: any) => {
                return {
                    ...res,
                    project: res.project === null ? null : res.project.id,
                };
            }),
            tap((res: Task) => {
                this.storeTask.dispatch(new TaskAction.AddTask(res));
                if (res?.project) {
                    console.log(res);

                    this.storeProject.dispatch(
                        new ProjectAction.AddTaskToProject(res)
                    );
                }
                this.notifier.showSuccess('Task was added successfully');
            })
        );
    }
    update(taskUpdated: Task): Observable<Task> {
        return this.http
            .patch(urlTasks + `/${taskUpdated.id}`, taskUpdated)
            .pipe(
                map((res: any) => {
                    console.log(res);

                    return {
                        ...res,
                        project: res.project === null ? null : res.project.id,
                    };
                }),
                tap((res: Task) => {
                    console.log(res);

                    this.storeTask.dispatch(new TaskAction.UpdateTask(res));
                    if (res?.project) {
                        console.log(res);

                        this.storeProject.dispatch(
                            new ProjectAction.UpdateTaskFromProject(res)
                        );
                    }
                    this.notifier.showSuccess('Task was updated successfully');
                })
            );
    }
    delete(id: string): Observable<Task> {
        return this.http.delete(urlTasks + `/${id}`).pipe(
            map((res: any) => {
                return {
                    ...res,
                    project: res.project === null ? null : res.project.id,
                };
            }),
            tap((res: Task) => {
                this.storeTask.dispatch(new TaskAction.DeleteTask(id));
                if (res?.project) {
                    this.storeProject.dispatch(
                        new ProjectAction.DeleteTaskFromProject(res)
                    );
                }
                this.notifier.showSuccess('Task was deleted successfully');
            })
        );
    }
}
