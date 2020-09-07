import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TasksComponent } from './tasks.component';
import { TasksService } from 'src/app/core/services/tasks.service';
import { of } from 'rxjs';
export const tasksServiceStub = {
    tasks: 0,
    taskssSub: of(0),
    getAll: () => {},
    getById: () => {},
    add: () => {},
    update: () => {},
    delete: () => {},
};
describe('TasksComponent', () => {
    let component: TasksComponent;
    let fixture: ComponentFixture<TasksComponent>;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TasksComponent],
            providers: [{ provide: TasksService, useValue: tasksServiceStub }],
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
