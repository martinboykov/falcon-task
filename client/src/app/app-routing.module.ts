import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { TasksResolverService } from './tasks/tasks.resolver';
import { ProjectsResolverService } from './projects/projects.resolver';
import { TaskEditComponent } from './tasks/components/task-edit/task-edit.component';
import { TasksComponent } from './tasks/components/tasks.component';
import { ProjectEditComponent } from './projects/components/project-edit/project-edit.component';
import { ProjectsComponent } from './projects/components/projects.component';
import { ProjectResolverService } from './projects/project.resolver';
import { TaskResolverService } from './tasks/task.resolver';
import { ProjectDetailsComponent } from './projects/components/project-details/project-details.component';

const routes: Routes = [
    {
        path: '',
        component: WelcomeComponent,
    },
    {
        path: 'tasks',
        component: TasksComponent,
        resolve: {
            tasks: TasksResolverService,
        },
    },

    {
        path: 'tasks/add',
        component: TaskEditComponent,
        resolve: {
            project: ProjectResolverService,
            projects: ProjectsResolverService,
            tasks: TasksResolverService,
        },
    },
    {
        path: 'tasks/edit/:id',
        component: TaskEditComponent,
        resolve: {
            // project: ProjectResolverService,
            projects: ProjectsResolverService,
            tasks: TasksResolverService,
            task: TaskResolverService,
        },
    },
    {
        path: 'projects',
        component: ProjectsComponent,
        resolve: {
            projects: ProjectsResolverService,
            tasks: TasksResolverService,
        },
    },
    {
        path: 'projects/add',
        component: ProjectEditComponent,
        resolve: {
            projects: ProjectsResolverService,
            tasks: TasksResolverService,
        },
    },
    {
        path: 'projects/edit/:id',
        component: ProjectEditComponent,
        resolve: {
            projects: ProjectsResolverService,
            project: ProjectResolverService,
            tasks: TasksResolverService,
        },
    },
    {
        path: 'projects/:id',
        component: ProjectDetailsComponent,
        resolve: {
            project: ProjectResolverService,
            projects: ProjectsResolverService,
            tasks: TasksResolverService,
        },
    },
    {
        path: 'projects/:id/add',
        component: TaskEditComponent,
        resolve: {
            project: ProjectResolverService,
            projects: ProjectsResolverService,
            tasks: TasksResolverService,
        },
    },


    {
        path: '**',
        component: NotFoundComponent,
    },
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
