import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Task, TaskState } from 'src/app/tasks/models/task.model';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NotificationService } from './notification.service';
import * as TaskAction from '../../tasks/store/task.actions';
import * as fromTask from '../../tasks/store/task.reducer';
import { Store } from '@ngrx/store';
const urlTasks = environment.apiUrl + '/tasks';

@Injectable({
    providedIn: 'root',
})
export class TasksService {
    constructor(
        private http: HttpClient,
        private router: Router,
        private notifier: NotificationService,
        private store: Store<fromTask.State>
    ) {}

    getAll(): Observable<Task[]> {
        return this.http
            .get<Task[]>(urlTasks, {
                params: new HttpParams(),
            })
            .pipe(
                tap((res: Task[]) => {
                    this.store.dispatch(new TaskAction.GetTasks(res));
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
    add(task: Task): Observable<Task> {
        const newTask = {
            ...task,
            state: TaskState.started,
            priority: 0
        };
        return this.http.post<Task>(urlTasks, newTask).pipe(
            tap((res: Task) => {
                this.store.dispatch(new TaskAction.AddTask(res));
                this.router.navigate(['/tasks']);
                this.notifier.showSuccess('Task was added successfully');
            })
        );
    }
    update(taskUpdated: Task): Observable<Task> {
        return this.http
            .patch(urlTasks + `/${taskUpdated.id}`, taskUpdated)
            .pipe(
                tap((res: Task) => {
                    this.store.dispatch(new TaskAction.UpdateTask(res));
                    this.notifier.showSuccess('Task was updated successfully');
                })
            );
    }
    delete(id: string): Observable<Task> {
        return this.http.delete(urlTasks + `/${id}`).pipe(
            tap((res: Task) => {
                this.store.dispatch(new TaskAction.DeleteTask(id));
                this.notifier.showSuccess('Task was deleted successfully');
            })
        );
    }
}
