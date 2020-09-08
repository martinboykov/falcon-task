import {
    async,
    ComponentFixture,
    TestBed,
    fakeAsync,
    tick,
} from '@angular/core/testing';
import { TasksComponent } from './tasks.component';
import { TasksService } from 'src/app/core/services/tasks.service';
import { tasksServiceStub } from '../testing/task.service-stub';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement, Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
@Component({
    selector: 'app-mock',
    template: '',
})
class MockComponent {}

describe('TasksComponent', () => {
    let component: TasksComponent;
    let fixture: ComponentFixture<TasksComponent>;
    let location: Location;
    let router: Router;
    let de: DebugElement;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule.withRoutes([
                    {
                        path: 'add',
                        component: MockComponent,
                    },
                ]),
            ],
            declarations: [TasksComponent],
            providers: [{ provide: TasksService, useValue: tasksServiceStub }],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TasksComponent);
        router = TestBed.inject(Router);
        location = TestBed.inject(Location);
        component = fixture.componentInstance;
        de = fixture.debugElement;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('should navigate to correct path', fakeAsync(() => {
        const ankor = de.query(By.css('a')).nativeElement;
        ankor.click();
        tick();
        fixture.detectChanges();
        expect(location.path()).toBe('/add');
    }));
});
