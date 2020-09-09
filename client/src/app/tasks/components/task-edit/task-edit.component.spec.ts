import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskEditComponent } from './task-edit.component';
import { tasksServiceStub } from '../../testing/task.service-stub';
import { TasksService } from 'src/app/core/services/tasks.service';
import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TASKS } from '../../testing/test.tasks';
import { Task } from '../../models/task.model';
import { RouterTestingModule } from '@angular/router/testing';
const task: Task = TASKS[0];
const tasks: Task[] = TASKS;
@Component({
    selector: 'app-mock',
    template: '',
})
class MockComponent {}
describe('TaskEditComponent', () => {
    let component: TaskEditComponent;
    let fixture: ComponentFixture<TaskEditComponent>;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                FormsModule,
                ReactiveFormsModule,
                RouterTestingModule.withRoutes([
                    {
                        path: 'tasks',
                        component: MockComponent,
                    },
                ]),
            ],
            declarations: [TaskEditComponent],
            providers: [
                FormBuilder,
                { provide: TasksService, useValue: tasksServiceStub },
                {
                    provide: ActivatedRoute,
                    useValue: {
                        snapshot: {
                            paramMap: {
                                get(): string {
                                    return task.id;
                                },
                            },
                        },
                    },
                },
            ],
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
