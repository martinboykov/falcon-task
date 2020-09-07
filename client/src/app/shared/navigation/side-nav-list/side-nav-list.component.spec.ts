import {
    async,
    ComponentFixture,
    TestBed,
    fakeAsync,
    tick,
} from '@angular/core/testing';
import { SideNavListComponent } from './side-nav-list.component';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement, Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from '@angular/common';
@Component({
    selector: 'app-mock',
    template: '',
})
class MockComponent {}
describe('SideNavListComponent', () => {
    let component: SideNavListComponent;
    let fixture: ComponentFixture<SideNavListComponent>;
    let location: Location;
    let router: Router;
    let de: DebugElement;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule.withRoutes([
                    {
                        path: 'tasks',
                        component: MockComponent,
                    },
                ]),
            ],
            declarations: [SideNavListComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
    }));

    beforeEach(() => {
        router = TestBed.inject(Router);
        location = TestBed.inject(Location);
        fixture = TestBed.createComponent(SideNavListComponent);
        component = fixture.componentInstance;
        de = fixture.debugElement;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('should have ankor tag width "home" keyword', () => {
        const ankors = de.queryAll(By.css('a'));
        const home = ankors.some((ankor) => {
            return ankor.nativeElement.innerText.toLowerCase().includes('home');
        });
        expect(home).toBeTruthy();
    });
    it('should have ankor tag width "task" keyword', () => {
        const ankors = de.queryAll(By.css('a'));
        const task = ankors.some((ankor) => {
            return ankor.nativeElement.innerText.toLowerCase().includes('task');
        });
        expect(task).toBeTruthy();
    });
    it('should navigate to correct path', fakeAsync(() => {
        const ankors = de.queryAll(By.css('a'));
        const home = ankors.filter((ankor) => {
            return ankor.nativeElement.innerText.toLowerCase().includes('home');
        })[0];
        const task = ankors.filter((ankor) => {
            return ankor.nativeElement.innerText.toLowerCase().includes('task');
        })[0];

        home.nativeElement.click();
        tick();
        fixture.detectChanges();
        expect(location.path()).toBe('/');

        task.nativeElement.click();
        tick();
        fixture.detectChanges();
        expect(location.path()).toBe('/tasks');
    }));
});
