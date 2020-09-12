import { Routes } from '@angular/router';
import { TasksComponent } from './components/tasks.component';
import { TaskEditComponent } from './components/task-edit/task-edit.component';
import { TaskResolverService } from './task.resolver';

export const TasksRoutes: Routes = [
    {
        path: '',
        component: TasksComponent,
    },
    {
        path: 'add',
        component: TaskEditComponent,
    },
    {
        path: 'edit/:id',
        component: TaskEditComponent,
        resolve: {
            data: TaskResolverService,
        },

    },
];
