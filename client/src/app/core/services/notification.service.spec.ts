import { TestBed } from '@angular/core/testing';
import { NotificationService } from './notification.service';
import { ToastrService } from 'ngx-toastr';
import { toastrServiceStub } from 'src/app/tasks/testing/toastr.service-stub';

export const routerStub = {
    navigate: jasmine.createSpy('navigate'),
};

describe('TasksService', () => {
    let service: NotificationService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                NotificationService,
                {
                    provide: ToastrService,
                    useValue: toastrServiceStub,
                },
            ],
        });
        service = TestBed.inject(NotificationService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
    it('should call toastr success message', () => {
        const spy = spyOn(toastrServiceStub, 'success').and.callThrough();
        service.showSuccess();
        expect(spy).toHaveBeenCalled();
    });
    it('should call toastr success message', () => {
        const spy = spyOn(toastrServiceStub, 'info').and.callThrough();
        service.showInfo();
        expect(spy).toHaveBeenCalled();
    });
    it('should call toastr success message', () => {
        const spy = spyOn(toastrServiceStub, 'warning').and.callThrough();
        service.showWarning();
        expect(spy).toHaveBeenCalled();
    });
    it('should call toastr success message', () => {
        const spy = spyOn(toastrServiceStub, 'error').and.callThrough();
        service.showError();
        expect(spy).toHaveBeenCalled();
    });
});
