import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Task, TaskState } from 'src/app/tasks/models/task.model';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

const urlTasks = environment.apiUrl + '/tasks';

@Injectable({
    providedIn: 'root',
})
export class TasksService {
    tasks: Task[] = [];
    tasksSubject = new BehaviorSubject<Task[]>(this.tasks);

    constructor(private http: HttpClient, private router: Router) {}

    getAll(): Observable<Task[]> {
        return this.http
            .get<Task[]>(urlTasks, {
                params: new HttpParams(),
            })
            .pipe(
                tap((res: Task[]) => {
                    this.tasks = res;
                    this.tasksSubject.next(res);
                })
            );
    }
    getById(id: string): Observable<Task> {
        return this.http.get<Task>(urlTasks + `/${id}`);
    }
    add(task: Task): Observable<Task> {
        const newTask = {
            ...task,
            state: TaskState.started,
        };
        return this.http.post<Task>(urlTasks, newTask).pipe(
            tap((res: Task) => {
                this.tasks = [...this.tasks, res];
                this.tasksSubject.next(this.tasks);
                this.router.navigate(['/tasks']);
            })
        );
    }
    update(taskUpdated: Task): Observable<Task> {
        return this.http
            .patch(urlTasks + `/${taskUpdated.id}`, taskUpdated)
            .pipe(
                tap((res: Task) => {
                    this.tasks = [
                        ...this.tasks.map((task) => {
                            if (task.id === taskUpdated.id) {
                                return res;
                            } else {
                                return task;
                            }
                        }),
                    ];
                    this.tasksSubject.next(this.tasks);
                })
            );
    }
    delete(id: string): Observable<Task> {
        return this.http.delete(urlTasks + `/${id}`).pipe(
            tap((res: Task) => {
                this.tasks = [...this.tasks.filter((task) => task.id !== id)];
                this.tasksSubject.next(this.tasks);
            })
        );
    }
}
