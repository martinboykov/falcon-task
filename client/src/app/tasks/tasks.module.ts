import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksComponent } from './tasks.component';
import { TasksRoutes } from './tasks.routing';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [TasksComponent],
    imports: [CommonModule, RouterModule.forChild(TasksRoutes), SharedModule],
})
export class TasksModule {}
