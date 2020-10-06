import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsRoutes } from './projects.routing';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ProjectEditComponent } from './components/project-edit/project-edit.component';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { StoreModule } from '@ngrx/store';
import { projectReducer } from './store/project.reducer';
import { ProjectsComponent } from './components/projects.component';
import { ProjectDetailsComponent } from './components/project-details/project-details.component';
import { TasksModule } from '../tasks/tasks.module';
const materialModules = [
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatSnackBarModule,
    MatSelectModule,
];
@NgModule({
    declarations: [
        ProjectsComponent,
        ProjectDetailsComponent,
        ProjectEditComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        // RouterModule.forChild(ProjectsRoutes),
        SharedModule,
        TasksModule,
        ...materialModules,
        // StoreModule.forFeature('projects', projectReducer),
    ],
    exports: [ProjectsComponent, ProjectDetailsComponent, ProjectEditComponent],
})
export class ProjectsModule {}
