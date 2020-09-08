import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TasksListComponent } from './tasks-list.component';
import { tasksServiceStub } from '../../testing/task.service-stub';
import { TasksService } from 'src/app/core/services/tasks.service';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement, Component } from '@angular/core';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { Location } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { TASKS } from '../../testing/test.tasks';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Task } from '../../models/task.model';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatTableHarness } from '@angular/material/table/testing';
import { MatInputHarness } from '@angular/material/input/testing';

@Component({
    selector: 'app-mock',
    template: '',
})
class MockComponent {}

describe('TasksListComponent', () => {
    let component: TasksListComponent;
    let fixture: ComponentFixture<TasksListComponent>;
    let location: Location;
    let router: Router;
    let de: DebugElement;
    let loader: HarnessLoader;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule.withRoutes([
                    {
                        path: 'tasks',
                        component: MockComponent,
                    },
                ]),
                MatTableModule,
            ],
            declarations: [TasksListComponent],
            providers: [{ provide: TasksService, useValue: tasksServiceStub }],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
    }));

    beforeEach(async () => {
        fixture = TestBed.createComponent(TasksListComponent);
        router = TestBed.inject(Router);
        location = TestBed.inject(Location);
        component = fixture.componentInstance;
        loader = TestbedHarnessEnvironment.loader(fixture);
        de = fixture.debugElement;
        component.tasks = new MatTableDataSource<Task>();
        component.tasks.data = TASKS;
        fixture.detectChanges();
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('should have correct amount of header cells', async () => {
        const headerCells = de.queryAll(By.css('.mat-header-cell'));
        expect(headerCells.length).toBe(6);
        expect(headerCells[0].nativeElement.innerHTML).toMatch('id');
        expect(headerCells[1].nativeElement.innerHTML).toMatch('Title');
        expect(headerCells[2].nativeElement.innerHTML).toMatch('Description');
        expect(headerCells[3].nativeElement.innerHTML).toMatch('Completion');
        expect(headerCells[4].nativeElement.innerHTML).toMatch('Update');
        expect(headerCells[5].nativeElement.innerHTML).toMatch('Delete');
    });
    it('should have correct amount of table rows', async () => {
        const tableRows = de.queryAll(By.css('.mat-row'));
        expect(tableRows.length).toBe(2);
        expect(tableRows[0].nativeElement.innerHTML).toMatch('work_outline');
        expect(tableRows[1].nativeElement.innerHTML).toMatch('work');
    });
    it('should have correct completion state', async () => {
        const tableRows = de.queryAll(By.css('.mat-row'));
        expect(tableRows[0].nativeElement.innerHTML).toMatch('work_outline');
        expect(tableRows[1].nativeElement.innerHTML).not.toMatch(
            'work_outline'
        );
    });
    it('should have call onStateChange', async () => {
        const spy = spyOn(component, 'onStateChage').and.callThrough();
        const spyServiceUpdate = spyOn(
            tasksServiceStub,
            'update'
        ).and.callThrough();
        const button = await loader.getAllHarnesses(
            MatButtonHarness.with({ selector: '.btn-state' })
        );
        await button[0].click();
        await button[1].click();
        expect(spy).toHaveBeenCalledTimes(2);
        expect(spyServiceUpdate).toHaveBeenCalledTimes(2);
    });
    it('should have call onDelete', async () => {
        const spy = spyOn(component, 'onDelete').and.callThrough();
        const spyServiceDelete = spyOn(
            tasksServiceStub,
            'delete'
        ).and.callFake(() => {});
        const button = await loader.getHarness(
            MatButtonHarness.with({ selector: '.btn-delete' })
        );
        await button.click();
        expect(spy).toHaveBeenCalled();
        expect(spyServiceDelete).toHaveBeenCalled();
    });

    it('should have call doFilter and filter tasks', async () => {
        const spy = spyOn(component, 'doFilter').and.callThrough();
        const inputField = await loader.getHarness<MatInputHarness>(
            MatInputHarness
        );
        const table = await loader.getHarness<MatTableHarness>(MatTableHarness);
        let rows = await table.getRows();
        expect((await rows[0].getCellTextByColumnName()).id).toMatch('101');
        await inputField.setValue('completed');
        rows = await table.getRows();
        fixture.detectChanges();
        expect(spy).toHaveBeenCalled();
        expect((await rows[0].getCellTextByColumnName()).id).toMatch('202');
    });
});

