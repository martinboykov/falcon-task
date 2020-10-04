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
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { StoreModule } from '@ngrx/store';
import { taskReducer } from './store/task.reducer';
const materialModules = [
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatSnackBarModule,
    MatSelectModule
];
@NgModule({
    declarations: [TasksComponent, TasksListComponent, TaskEditComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(TasksRoutes),
        SharedModule,
        ...materialModules,
        StoreModule.forFeature('tasks', taskReducer),
    ],
    exports: [TasksComponent, TasksListComponent, TaskEditComponent],
})
export class TasksModule {}
