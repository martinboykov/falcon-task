import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskEditComponent } from './task-edit.component';
import { tasksServiceStub } from '../../testing/task.service-stub';
import { TasksService } from 'src/app/core/services/tasks.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('TaskEditComponent', () => {
    let component: TaskEditComponent;
    let fixture: ComponentFixture<TaskEditComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TaskEditComponent],
            providers: [{ provide: TasksService, useValue: tasksServiceStub }],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TaskEditComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
