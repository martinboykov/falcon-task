import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Task, TaskState } from 'src/app/tasks/models/task.model';

const urlTasks = environment.apiUrl + '/tasks';

@Injectable({
    providedIn: 'root',
})
export class TasksService {
    tasks: Task[] = [];
    tasksSubject = new BehaviorSubject<Task[]>(this.tasks);

    constructor(private http: HttpClient) {}

    getAll() {
        return this.http
            .get<Task[]>(urlTasks, {
                params: new HttpParams(),
            })
            .subscribe((res: Task[]) => {
                this.tasks = res;
                this.tasksSubject.next(res);
            });
    }
    getById(id: string) {
        return this.http.get<Task>(urlTasks + `/${id}`).subscribe();
    }
    add(task: Task) {
        const newTask = {
            ...task,
            state: TaskState.started,
        };
        return this.http.post<Task>(urlTasks, newTask).subscribe((res) => {
            this.tasks = [...this.tasks, newTask];
            this.tasksSubject.next(this.tasks);
        });
    }
    update(taskUpdated: Task) {
        return this.http
            .patch(urlTasks + `/${taskUpdated.id}`, taskUpdated)
            .subscribe((res) => {
                this.tasks = [
                    ...this.tasks.map((task) => {
                        if (task.id === taskUpdated.id) {
                            return taskUpdated;
                        } else {
                            return task;
                        }
                    }),
                ];
                this.tasksSubject.next(this.tasks);
            });
    }
    delete(id: string) {
        return this.http.delete(urlTasks + `/${id}`).subscribe((res) => {
            this.tasks = [...this.tasks.filter((task) => task.id !== id)];
            this.tasksSubject.next(this.tasks);
        });
    }
}
