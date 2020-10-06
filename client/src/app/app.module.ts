import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { StoreModule } from '@ngrx/store';
import * as fromApp from './store/app.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { TasksModule } from './tasks/tasks.module';
import { RouterModule } from '@angular/router';
import * as fromProjects from './projects/store/project.reducer';
import * as fromTasks from './tasks/store/task.reducer';
import { ProjectsModule } from './projects/projects.module';

@NgModule({
    declarations: [AppComponent, WelcomeComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        CoreModule,
        SharedModule,
        TasksModule,
        ProjectsModule,
        AppRoutingModule,
        ToastrModule.forRoot({
            timeOut: 10000,
            positionClass: 'toast-top-right',
            maxOpened: 3,
            countDuplicates: true,
            preventDuplicates: true,
        }),
        StoreModule.forRoot(fromApp.reducers),
        // StoreModule.forRoot({
        //     projects: fromProjects.projectReducer,
        //     tasks: fromTasks.taskReducer,
        // }),
        StoreDevtoolsModule.instrument({
            maxAge: 25, // Retains last 25 states
            logOnly: environment.production, // Restrict extension to log-only mode
        }),
    ],
    exports: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
