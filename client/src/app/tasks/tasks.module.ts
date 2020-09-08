import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksRoutes } from './tasks.routing';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { TasksComponent } from './components/tasks.component';
import { TasksListComponent } from './components/tasks-list/tasks-list.component';
import { TaskEditComponent } from './components/task-edit/task-edit.component';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
const materialModules = [
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule
];
@NgModule({
    declarations: [TasksComponent, TasksListComponent, TaskEditComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(TasksRoutes),
        SharedModule,
        ...materialModules,
    ],
    exports: [TasksComponent, TasksListComponent, TaskEditComponent],
})
export class TasksModule {}
