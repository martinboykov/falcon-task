import {
    HttpClientTestingModule,
    HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { TasksService } from './tasks.service';
import { Task, TaskState } from 'src/app/tasks/models/task.model';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TASKS } from 'src/app/tasks/testing/test.tasks';
import { Router } from '@angular/router';
import { NotificationService } from './notification.service';
import { notificationsServiceStub } from 'src/app/testing/notification.service-stub';
import { Store } from '@ngrx/store';
import { TasksState } from 'src/app/tasks/store/task.reducer';
const testStore = jasmine.createSpyObj<Store<TasksState>>('Store', [
    'dispatch',
]);
const urlTasks = environment.apiUrl + '/tasks';
const task: Task = {
    ...TASKS[0],
};
const taskUpdateMock: Task = {
    ...task,
    title: 'updated',
    description: 'updated',
    state: TaskState.completed,
};
const tasks: Task[] = [...TASKS];
export const routerStub = {
    navigate: jasmine.createSpy('navigate'),
};

describe('TasksService', () => {
    let service: TasksService;
    let httpClient: HttpClient;
    let httpMock: HttpTestingController;
    let notifier: NotificationService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                TasksService,
                { provide: Router, useValue: routerStub },
                {
                    provide: NotificationService,
                    useValue: notificationsServiceStub,
                },
                { provide: Store, useValue: testStore },
            ],
        });
        service = TestBed.inject(TasksService);
        notifier = TestBed.inject(NotificationService);
        httpClient = TestBed.inject(HttpClient);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
    describe('getAll', () => {
        it('should return instance of Observable', () => {
            const result = service.getAll();
            expect(result).toBeInstanceOf(Observable);
        });
        it('should make a get request', () => {
            const result = service.getAll();
            result.subscribe(() => {});
            const req = httpMock.expectOne(urlTasks);
            expect(req.request.method).toEqual('GET');
            req.flush(tasks);
        });
        it('should make a call to dispatch method', () => {
            const result = service.getAll();
            const spy = testStore.dispatch.and.callThrough();
            result.subscribe(() => {
                expect(spy).toHaveBeenCalled();
            });
            const req = httpMock.expectOne(urlTasks);
            req.flush(tasks);
        });
        it('should make a call to notifier showInfo method', () => {
            const result = service.getAll();
            const spy = spyOn(notifier, 'showInfo').and.callThrough();
            expect(result).toBeInstanceOf(Observable);
            result.subscribe(() => {
                expect(spy).toHaveBeenCalled();
            });
            const req = httpMock.expectOne(urlTasks);
            req.flush(tasks);
        });
    });
    describe('getById', () => {
        it('should return instance of Observable', () => {
            const result = service.getById(task.id);
            expect(result).toBeInstanceOf(Observable);
        });
        it('should make a get request', () => {
            const result = service.getById(task.id);
            result.subscribe(() => {});
            const req = httpMock.expectOne(urlTasks + `/${task.id}`);
            expect(req.request.method).toEqual('GET');
            req.flush(tasks);
        });
        it('should make a call to notifier showInfo method', () => {
            const result = service.getById(task.id);
            const spy = spyOn(notifier, 'showInfo').and.callThrough();
            expect(result).toBeInstanceOf(Observable);
            result.subscribe(() => {
                expect(spy).toHaveBeenCalled();
            });
            const req = httpMock.expectOne(urlTasks + `/${task.id}`);
            req.flush(tasks);
        });
    });
    describe('add', () => {
        it('should return instance of Observable', () => {
            const result = service.add(task);
            expect(result).toBeInstanceOf(Observable);
        });
        it('should make a get request', () => {
            const result = service.add(task);
            result.subscribe(() => {});
            const req = httpMock.expectOne(urlTasks);
            expect(req.request.method).toEqual('POST');
            req.flush(tasks);
        });
        it('should make a call to dispatch method', () => {
            const result = service.add(task);
            const spy = testStore.dispatch.and.callThrough();
            result.subscribe(() => {
                expect(spy).toHaveBeenCalled();
            });
            const req = httpMock.expectOne(urlTasks);
            req.flush(tasks);
        });
        it('should make a call to notifier showSuccess method', () => {
            const result = service.add(task);
            const spy = spyOn(notifier, 'showSuccess').and.callThrough();
            result.subscribe(() => {
                expect(spy).toHaveBeenCalled();
            });
            const req = httpMock.expectOne(urlTasks);
            req.flush(tasks);
        });
        it('should navigate to "/tasks"', () => {
            const result = service.add(task);
            result.subscribe(() => {
                expect(routerStub.navigate).toHaveBeenCalledWith(['/tasks']);
            });
            const req = httpMock.expectOne(urlTasks);
            expect(req.request.method).toEqual('POST');
            req.flush(task);
        });
    });
    describe('update', () => {
        it('should return instance of Observable', () => {
            const taskUpdate: Task = {
                ...taskUpdateMock,
            };
            const result = service.update(taskUpdate);
            expect(result).toBeInstanceOf(Observable);
        });
        it('should make a PATCH request', () => {
            const taskUpdate: Task = {
                ...taskUpdateMock,
            };
            const result = service.update(taskUpdate);
            result.subscribe(() => {});
            const req = httpMock.expectOne(urlTasks + `/${taskUpdate.id}`);
            expect(req.request.method).toEqual('PATCH');
            req.flush(tasks);
        });
        it('should make a call to dispatch method', () => {
            const taskUpdate: Task = {
                ...taskUpdateMock,
            };
            const spy = testStore.dispatch.and.callThrough();
            const result = service.update(taskUpdate);
            result.subscribe(() => {
                expect(spy).toHaveBeenCalled();
            });
            const req = httpMock.expectOne(urlTasks + `/${taskUpdate.id}`);
            req.flush(tasks);
        });
        it('should make a call to notifier showSuccess method', () => {
            const taskUpdate: Task = {
                ...taskUpdateMock,
            };
            const result = service.update(taskUpdate);
            const spy = spyOn(notifier, 'showSuccess').and.callThrough();
            result.subscribe(() => {
                expect(spy).toHaveBeenCalled();
            });
            const req = httpMock.expectOne(urlTasks + `/${taskUpdate.id}`);
            req.flush(tasks);
        });
    });
    describe('delete', () => {
        it('should return instance of Observable', () => {
            const result = service.delete(task.id);
            expect(result).toBeInstanceOf(Observable);
        });
        it('should make a DELETE request', () => {
            const result = service.delete(task.id);
            result.subscribe();
            const req = httpMock.expectOne(urlTasks + `/${task.id}`);
            expect(req.request.method).toEqual('DELETE');
            req.flush(task);
        });
        it('should make a call to dispatch method', () => {
            const result = service.delete(task.id);
            const spy = testStore.dispatch.and.callThrough();
            result.subscribe(() => {
                expect(spy).toHaveBeenCalled();
            });
            const req = httpMock.expectOne(urlTasks + `/${task.id}`);
            req.flush(tasks);
        });
        it('should make a call to notifier showSuccess method', () => {
            const result = service.delete(task.id);
            const spy = spyOn(notifier, 'showSuccess').and.callThrough();
            result.subscribe(() => {
                expect(spy).toHaveBeenCalled();
            });
            const req = httpMock.expectOne(urlTasks + `/${task.id}`);
            req.flush(tasks);
        });
    });
});
