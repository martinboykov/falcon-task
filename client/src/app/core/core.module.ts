import { NgModule, ErrorHandler } from '@angular/core';
import { TasksService } from './services/tasks.service';
import { ErrorService } from './services/error.service';
import { NotificationService } from './services/notification.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { GlobalErrorHandler } from './handlers/global-error-handler';
import { ServerErrorInterceptor } from './interceptors/server-error.interceptor';

@NgModule({
    providers: [
        TasksService,
        ErrorService,
        NotificationService,
        { provide: ErrorHandler, useClass: GlobalErrorHandler },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ServerErrorInterceptor,
            multi: true,
        },
    ],
})
export class CoreModule {}
