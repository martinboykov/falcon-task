import {
    ErrorHandler,
    Injectable,
    Injector,
    NgZone,
    Inject,
} from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpError } from '../models/httpError.model';
import { ErrorService } from '../services/error.service';
import { NotificationService } from '../services/notification.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
    public readonly DEFAULT_ERROR_TITLE: string = 'Something went wrong';

    constructor(
        @Inject(NgZone) private ngZone,
        @Inject(Injector) private injector: Injector
    ) {}

    private get errorService(): ErrorService {
        return this.injector.get(ErrorService);
    }
    private get notifier(): NotificationService {
        return this.injector.get(NotificationService);
    }
    public handleError(error: Error | HttpErrorResponse) {
        this.ngZone.run(() => {
            let message;
            let stackTrace;
            let httpErrorCode;
            if (error instanceof HttpErrorResponse) {
                // Server Error
                message = this.errorService.getServerMessage(error);
                stackTrace = this.errorService.getServerStack(error);
                httpErrorCode = error.status;
                switch (httpErrorCode) {
                    case HttpError.ERR_CONNECTION_REFUSED: // 0
                        this.notifier.showError(
                            'There is no connection to the server',
                            'Server down'
                        );
                        break;
                    case HttpError.BAD_REQUEST: // 400
                        this.notifier.showError(
                            message,
                            this.DEFAULT_ERROR_TITLE
                        );
                        break;
                    case HttpError.NOT_FOUND: // 404
                        this.notifier.showError(message, 'Not found!');
                        break;
                    case HttpError.TIMEOUT: // 408
                        this.notifier.showError(
                            'Too much time has elapsed',
                            'Not fount in time!'
                        );
                        break;
                    case HttpError.INTERNAL_SERVER_ERROR: // 500
                        this.notifier.showError(
                            'Invalid route or server crash',
                            this.DEFAULT_ERROR_TITLE
                        );
                        break;
                    case HttpError.SERVER_REQUEST_LIMIT_REACHED: // 429
                        break;
                    default:
                        this.notifier.showError(
                            'Server error encountered',
                            this.DEFAULT_ERROR_TITLE
                        );
                }
            } else {
                // Client Error
                this.notifier.showError(this.DEFAULT_ERROR_TITLE, 'Ooops!');
            }
        });
    }
}
