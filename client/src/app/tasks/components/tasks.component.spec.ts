import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TasksComponent } from './tasks.component';
import { TasksService } from 'src/app/core/services/tasks.service';
import { tasksServiceStub } from '../tests/task.service-stub';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('TasksComponent', () => {
    let component: TasksComponent;
    let fixture: ComponentFixture<TasksComponent>;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TasksComponent],
            providers: [{ provide: TasksService, useValue: tasksServiceStub }],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TasksComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
