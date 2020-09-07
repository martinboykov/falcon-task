import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksRoutes } from './tasks.routing';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { TasksComponent } from './components/tasks.component';

@NgModule({
    declarations: [TasksComponent],
    imports: [CommonModule, RouterModule.forChild(TasksRoutes), SharedModule],
})
export class TasksModule {}
