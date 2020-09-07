import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Subject, of, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map, concatMap } from 'rxjs/operators';
import { Task } from 'src/app/tasks/models/task.model';

const urlTasks = environment.apiUrl + '/tasks';

@Injectable({
    providedIn: 'root',
})
export class TasksService {
    tasks: Task[] = [];
    tasksSub = new BehaviorSubject<Task[]>(this.tasks);

    constructor(private http: HttpClient) {}

    getAll() {
        return this.http
            .get<Task[]>(urlTasks, {
                params: new HttpParams(),
            })
            .subscribe((tasks: any) => {
                this.tasksSub.next(tasks !== null ? tasks : []);
            });
    }
    getById(id: string) {
        return this.http
            .get<Task[]>(urlTasks + `/${id}`)
            .subscribe((task) => {});
    }
    add(task: Task) {
        const newTask = {
            ...task,
        };
        return this.http.post<Task>(urlTasks, newTask).subscribe((response) => {
            console.log(response);
        });
    }
    update(task: Task) {
        return this.http
            .patch(urlTasks + `/${task.id}`, task)
            .subscribe((response) => {
                console.log(response);
            });
    }
    delete(id: string) {
        return this.http.delete(urlTasks + `/${id}`).subscribe((response) => {
            console.log(response);
        });
    }
}
