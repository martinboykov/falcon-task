import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Subject, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map, concatMap } from 'rxjs/operators';
import { Task } from 'src/app/tasks/models/task.model';

const urlTasks = environment.apiUrl + '/tasks/';

@Injectable({
    providedIn: 'root',
})
export class TasksService {
    tasks: Task[] = [];
    tasksSub = new Subject<Task[]>();

    constructor(private http: HttpClient) {}

    getAll() {
        this.http
            .get<Task[]>(urlTasks, {
                params: new HttpParams(),
                // .set('order', 'asc')
                // .set('pageNumber', pageNumber.toString())
                // .set('pageSize', pageSize.toString()),
            })
            .pipe
            // map((data) => {
            //     console.log(data);
            // }),
            ()
            .subscribe(
                (tasks: any) => {
                    console.log(tasks);
                    this.tasksSub.next(tasks !== null ? tasks : []);
                },
                (error) => {
                    console.log(error);
                }
            );
    }
    getById(id: string) {
        return this.http.get<Task[]>(urlTasks + id);
    }
    add(task: Task) {
        const newTask = {
            ...task,
        };
        this.http
            .post<Task>(urlTasks, newTask)
            // .pipe(
            //     concatMap((res) => {
            //         this.getAll();
            //         return of(res);
            //     })
            // )
            .subscribe(
                (response) => {
                    console.log(response);
                },
                (error) => {
                    console.log(error);
                }
            );
    }
    update(task: Task) {
        this.http.patch(urlTasks + task.id, task).subscribe(
            (response) => {
                console.log(response);
            },
            (error) => {
                console.log(error);
            }
        );
    }
    delete(id: string) {
        this.http
            .delete(urlTasks + id)
            // .pipe(
            //     concatMap((res) => {
            //         this.getAll();
            //         return of(res);
            //     })
            // )
            .subscribe(
                (response) => {
                    console.log(response);
                },
                (error) => {
                    console.log(error);
                }
            );
    }
}
