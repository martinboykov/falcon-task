import {
    async,
    ComponentFixture,
    TestBed,
    fakeAsync,
    tick,
} from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement, Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from '@angular/common';
import { HeaderComponent } from './header.component';
@Component({
    selector: 'app-mock',
    template: ``,
})
class MockComponent {
    toggle() {}
}
describe('HeaderComponent', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;
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
            declarations: [HeaderComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
    }));

    beforeEach(() => {
        router = TestBed.inject(Router);
        location = TestBed.inject(Location);
        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
        de = fixture.debugElement;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
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
        const task = ankors.filter((ankor) => {
            return ankor.nativeElement.innerText.toLowerCase().includes('task');
        })[0];

        task.nativeElement.click();
        tick();
        fixture.detectChanges();
        expect(location.path()).toBe('/tasks');
    }));
    it('should have call toggle for sidenav', fakeAsync(() => {
        component.drawer = new MockComponent();
        const spy = spyOn(component.drawer, 'toggle');
        const el = de.query(By.css('.side-nav-toggle-button'));
        const button: HTMLElement = el.nativeElement;
        button.click();
        tick();
        expect(spy).toHaveBeenCalled();
    }));
});
