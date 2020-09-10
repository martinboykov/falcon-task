import {
    HttpClientTestingModule,
    HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { TasksService } from './tasks.service';
import { Task, TaskState } from 'src/app/tasks/models/task.model';
import { Subscription, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TASKS } from 'src/app/tasks/testing/test.tasks';
import { Router } from '@angular/router';
import { NotificationService } from './notification.service';
import { notificationsServiceStub } from 'src/app/tasks/testing/notification.service-stub';
const urlTasks = environment.apiUrl + '/tasks';
const task: Task = {
    ...TASKS[0],
};
const tasks: Task[] = [...TASKS];
export const routerStub = {
    navigate: jasmine.createSpy('navigate'),
};

describe('TasksService', () => {
    let service: TasksService;
    let httpClient: HttpClient;
    let httpMock: HttpTestingController;

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
            ],
        });
        service = TestBed.inject(TasksService);
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
        it('should add get all tesks', () => {
            const result = service.getAll();
            expect(result).toBeInstanceOf(Observable);
            result.subscribe((res) => {
                expect(service.tasks.length).toBe(2);
                expect(service.tasksSubject.value.length).toBe(2);
            });
            const req = httpMock.expectOne(urlTasks);
            expect(req.request.method).toEqual('GET');
            req.flush(tasks);
        });
    });
    describe('getById', () => {
        it('should get the task', () => {
            const result = service.getById(task.id);
            expect(result).toBeInstanceOf(Observable);
            result.subscribe();
            const req = httpMock.expectOne(urlTasks + `/${task.id}`);
            expect(req.request.method).toEqual('GET');
            req.flush(task.id);
        });
    });
    describe('add', () => {
        it('should make POST req', () => {
            const result = service.add(task);
            expect(result).toBeInstanceOf(Observable);
            result.subscribe((res) => {
                expect(service.tasks.length).toBe(1);
                expect(service.tasksSubject.value.length).toBe(1);
                expect(routerStub.navigate).toHaveBeenCalledWith(['/tasks']);
            });
            const req = httpMock.expectOne(urlTasks);
            expect(req.request.method).toEqual('POST');
            req.flush(task);
        });
    });

    describe('update', () => {
        it('should  make PATCH req and succesfully updated the task', () => {
            service.tasks = tasks;
            service.tasksSubject.next(tasks);
            const taskUpdate: Task = {
                ...service.tasks[0],
                title: 'updated',
                description: 'updated',
                state: TaskState.completed,
            };
            const result = service.update(taskUpdate);
            expect(result).toBeInstanceOf(Observable);
            result.subscribe((res) => {
                expect(service.tasks[0].title).toMatch('updated');
                expect(service.tasks[0].description).toMatch('updated');
                expect(service.tasks[0].state).toMatch(
                    TaskState.completed.toString()
                );
            });
            const req = httpMock.expectOne(urlTasks + `/${task.id}`);
            expect(req.request.method).toEqual('PATCH');
            req.flush(taskUpdate);
        });
    });

    describe('delete', () => {
        it('should make DELETE req and delete the task from tasks', () => {
            service.tasks = tasks;
            service.tasksSubject.next(tasks);
            const result = service.delete(task.id);
            expect(result).toBeInstanceOf(Observable);
            result.subscribe((res) => {
                expect(service.tasks[0].id).toMatch('202');
                expect(service.tasks[0].title).toMatch('test 202');
                expect(service.tasks[0].description).toMatch('test 202');
                expect(service.tasksSubject.value.length).toBe(1);
            });
            const req = httpMock.expectOne(urlTasks + `/${task.id}`);
            expect(req.request.method).toEqual('DELETE');
            req.flush(task);
        });
    });
});
