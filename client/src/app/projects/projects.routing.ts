import { Routes } from '@angular/router';
import { ProjectEditComponent } from './components/project-edit/project-edit.component';
import { ProjectsComponent } from './components/projects.component';
import { ProjectResolverService } from './project.resolver';

export const ProjectsRoutes: Routes = [
    {
        path: '',
        component: ProjectsComponent,
    },
    {
        path: 'add',
        component: ProjectEditComponent,
    },
    {
        path: 'edit/:id',
        component: ProjectEditComponent,
        resolve: {
            data: ProjectResolverService,
        },
    },
];
