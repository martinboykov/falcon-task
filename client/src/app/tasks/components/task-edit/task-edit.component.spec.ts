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
import { MatButtonHarness } from '@angular/material/button/testing';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { of } from 'rxjs';
const task: Task = {
    ...TASKS[0],
};
const tasks: Task[] = [...TASKS];
@Component({
    selector: 'app-mock',
    template: '',
})
class MockComponent {}
const ActivatedRouteStub = {};
describe('TaskEditComponent for Edit Mode', () => {
    let component: TaskEditComponent;
    let fixture: ComponentFixture<TaskEditComponent>;
    let loader: HarnessLoader;

    beforeEach(async(() => createTestBed(task.id)));
    beforeEach(() => {
        fixture = TestBed.createComponent(TaskEditComponent);
        loader = TestbedHarnessEnvironment.loader(fixture);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create component', () => {
        expect(component).toBeTruthy();
    });

    // VALIDATIONS
    // FORM
    it('should have valid form', () => {
        expect(component.taskForm.valid).toBeTruthy();
    });

    // TITLE FILED

    it('should not have title field width required error', () => {
        const titleError = component.hasError('title', 'required');
        expect(titleError).toBeFalse();
    });

    it('should have title field width required error', () => {
        component.title.setValue('');
        fixture.detectChanges();
        const titleError = component.hasError('title', 'required');
        expect(titleError).toBeTruthy();
    });
    it('should have title field width maxLength error', () => {
        component.title.setValue('#'.repeat(66));
        const titleError = component.hasError('title', 'maxlength');
        expect(titleError).toBeTruthy();
    });
    // DESCRIPTION FILED

    it('should not have description field width required error', () => {
        const descriptionError = component.hasError('description', 'required');
        expect(descriptionError).toBeFalse();
    });
    it('should have description field width required error', () => {
        component.description.setValue('');
        const descriptionError = component.hasError('description', 'required');
        expect(descriptionError).toBeTruthy();
    });
    it('should have description field width maxLength error', () => {
        const str = '#'.repeat(101);
        component.description.setValue(str);
        const descriptionError = component.hasError('description', 'maxlength');
        expect(descriptionError).toBeTruthy();
    });

    // FORM SUBMITION

    it('should update task', async () => {
        const spyComp = spyOn(component, 'onEditTask').and.callThrough();
        const spyService = spyOn(tasksServiceStub, 'update').and.callThrough();
        const button = await loader.getHarness(
            MatButtonHarness.with({ selector: '.btn-edit' })
        );
        await button.click();
        expect(spyComp).toHaveBeenCalled();
        expect(spyService).toHaveBeenCalled();
    });
    it('should not be able to update task if form is unvalid', async () => {
        const spyComp = spyOn(component, 'onEditTask').and.callThrough();
        const spyService = spyOn(tasksServiceStub, 'update').and.callThrough();
        const button = await loader.getHarness(
            MatButtonHarness.with({ selector: '.btn-edit' })
        );
        const str = '#'.repeat(101);
        component.description.setValue(str);
        await button.click();
        expect(spyComp).not.toHaveBeenCalled();
        expect(spyService).not.toHaveBeenCalled();
    });

    it('should have taskSubscription', () => {
        expect(component.taskSubscription).toBeDefined();
    });
    it('should unsubscribe from tasks onDestroy', () => {
        const spy = spyOn(
            component.taskSubscription,
            'unsubscribe'
        ).and.callThrough();
        component.ngOnDestroy();
        expect(spy).toHaveBeenCalled();
    });
});
describe('TaskEditComponent for Add Mode', () => {
    let component: TaskEditComponent;
    let fixture: ComponentFixture<TaskEditComponent>;
    let loader: HarnessLoader;

    beforeEach(async(() => createTestBed(null)));
    beforeEach(() => {
        fixture = TestBed.createComponent(TaskEditComponent);
        loader = TestbedHarnessEnvironment.loader(fixture);
        component = fixture.componentInstance;
        component.ngOnInit();
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
    // VALIDATIONS
    // FORM
    it('should have valid form', () => {
        expect(component.taskForm.valid).toBeFalse();
    });

    // TITLE FILED

    it('should not have title field width required error', () => {
        const titleError = component.hasError('title', 'required');
        expect(titleError).toBeTruthy();
    });
    // DESCRIPTION FILED

    it('should not have description field width required error', () => {
        const descriptionError = component.hasError('description', 'required');
        expect(descriptionError).toBeTruthy();
    });

    // FORM SUBMITION

    it('should update task', async () => {
        const spyComp = spyOn(component, 'onEditTask').and.callThrough();
        const spyService = spyOn(tasksServiceStub, 'update').and.callThrough();
        const button = await loader.getHarness(
            MatButtonHarness.with({ selector: '.btn-submit' })
        );
        await button.click();
        expect(spyComp).not.toHaveBeenCalled();
        expect(spyService).not.toHaveBeenCalled();
    });
    it('should be able to update task if form is valid', async () => {
        const spyComp = spyOn(component, 'onSubmit').and.callThrough();
        const spyService = spyOn(tasksServiceStub, 'add').and.callThrough();
        const button = await loader.getHarness(
            MatButtonHarness.with({ selector: '.btn-submit' })
        );
        const str = '#'.repeat(10);
        component.title.setValue(str);
        component.description.setValue(str);
        await button.click();
        expect(spyComp).toHaveBeenCalled();
        expect(spyService).toHaveBeenCalled();
    });

    it('should have taskSubscription', () => {
        expect(component.taskSubscription).not.toBeDefined();
    });
    it('should unsubscribe from tasks onDestroy', () => {
        expect(component.taskSubscription).not.toBeDefined();
    });
});

function createTestBed(id) {
    return TestBed.configureTestingModule({
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
                                return id;
                            },
                        },
                    },
                    data: of({
                        data: task,
                    }),
                },
            },
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
}
