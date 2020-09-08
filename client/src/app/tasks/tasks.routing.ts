import { Routes } from '@angular/router';
import { TasksComponent } from './components/tasks.component';
import { TasksListComponent } from './components/tasks-list/tasks-list.component';
import { TaskEditComponent } from './components/task-edit/task-edit.component';

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
    },
];
