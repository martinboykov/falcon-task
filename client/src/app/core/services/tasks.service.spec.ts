import {
    HttpClientTestingModule,
    HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { TasksService } from './tasks.service';
import { Task } from 'src/app/tasks/models/task.model';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
const urlTasks = environment.apiUrl + '/tasks';
const task: Task = {
    id: '1',
    title: 'test',
    description: 'teset',
};
const tasks: Task[] = [
    { id: '1', title: 'test', description: 'teset' },
    { id: '2', title: 'test', description: 'teset' },
];
describe('TasksService', () => {
    let service: TasksService;
    let httpClient: HttpClient;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [TasksService],
        });
        service = TestBed.inject(TasksService);
        httpClient = TestBed.inject(HttpClient);
        httpTestingController = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpTestingController.verify();
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
    describe('getAll', () => {
        it('should add get all tesks', () => {
            // make a fake request
            const result = service.getAll();
            expect(result).toBeInstanceOf(Subscription);

            // expect "GET" request
            const req = httpTestingController.expectOne(urlTasks);
            expect(req.request.method).toEqual('GET');

            req.flush(tasks);
            expect(service.tasksSub.value.length).toBe(2);
        });
    });
    describe('getById', () => {
        it('should get the task', () => {
            // make a fake request
            const result = service.getById(task.id);
            expect(result).toBeInstanceOf(Subscription);

            // expect "GET" request
            const req = httpTestingController.expectOne(
                urlTasks + `/${task.id}`
            );
            expect(req.request.method).toEqual('GET');
            req.flush(task);
        });
    });
    describe('add', () => {
        it('should make POST req', () => {
            const result = service.add(task);
            expect(result).toBeInstanceOf(Subscription);

            const req = httpTestingController.expectOne(urlTasks);
            expect(req.request.method).toEqual('POST');
            req.flush(task);
        });
    });
    describe('update', () => {
        it('should make PATCH req', () => {
            const result = service.update(task);
            expect(result).toBeInstanceOf(Subscription);

            const req = httpTestingController.expectOne(
                urlTasks + `/${task.id}`
            );
            expect(req.request.method).toEqual('PATCH');
            req.flush(task);
        });
    });
    describe('delete', () => {
        it('should make DELETE req', () => {
            const result = service.delete(task.id);
            expect(result).toBeInstanceOf(Subscription);

            const req = httpTestingController.expectOne(
                urlTasks + `/${task.id}`
            );
            expect(req.request.method).toEqual('DELETE');
            req.flush(task);
        });
    });
});
