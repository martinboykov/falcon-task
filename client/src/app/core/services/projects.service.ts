import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NotificationService } from './notification.service';
import * as ProjectAction from '../../projects/store/project.actions';
import * as fromProject from '../../projects/store/project.reducer';
import * as TaskAction from '../../tasks/store/task.actions';
import { Store } from '@ngrx/store';
import { Project } from 'src/app/projects/models/project.model';
import { TasksService } from './tasks.service';
const urlProjects = environment.apiUrl + '/projects';

@Injectable({
    providedIn: 'root',
})
export class ProjectsService {
    constructor(
        private http: HttpClient,
        private router: Router,
        private notifier: NotificationService,
        private store: Store<fromProject.ProjectsState>,
        private tasksService: TasksService
    ) {}

    getAll(): Observable<Project[]> {
        return this.http
            .get<Project[]>(urlProjects, {
                params: new HttpParams(),
            })
            .pipe(
                tap((res: Project[]) => {
                    this.store.dispatch(new ProjectAction.GetProjects(res));
                    if (res.length !== 0) {
                        this.notifier.showInfo('Projects loaded successfully');
                    }
                })
            );
    }
    getById(id: string): Observable<Project> {
        return this.http.get<Project>(urlProjects + `/${id}`).pipe(
            tap((res: Project) => {
                this.notifier.showInfo('Project loaded successfully');
                if (res) {
                    this.notifier.showInfo('Projects loaded successfully');
                }
            })
        );
    }
    add(project: Project): Observable<Project> {
        const newProject = {
            ...project,
        };
        return this.http.post<Project>(urlProjects, newProject).pipe(
            tap((res: Project) => {
                this.store.dispatch(new ProjectAction.AddProject(res));
                this.router.navigate(['/projects', res.id]);
                this.notifier.showSuccess('Project was added successfully');
            })
        );
    }
    update(projectUpdated: Project): Observable<Project> {
        return this.http
            .patch(urlProjects + `/${projectUpdated.id}`, projectUpdated)
            .pipe(
                tap((res: Project) => {
                    console.log(res);

                    this.store.dispatch(new ProjectAction.UpdateProject(res));
                    this.notifier.showSuccess(
                        'Project was updated successfully'
                    );
                })
            );
    }
    delete(id: string): Observable<Project> {
        return this.http.delete(urlProjects + `/${id}`).pipe(
            tap((res: Project) => {
                this.router.navigate(['/projects']);
                console.log(res.tasks);
                res.tasks.forEach((task) => {
                    console.log(task);
                    this.tasksService.delete(task.id).subscribe();
                });
                this.store.dispatch(new ProjectAction.DeleteProject(id));
                this.notifier.showSuccess('Project was deleted successfully');
            })
        );
    }
}
