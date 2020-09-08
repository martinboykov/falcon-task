import {
    async,
    ComponentFixture,
    TestBed,
    fakeAsync,
    tick,
} from '@angular/core/testing';

import { WelcomeComponent } from './welcome.component';
import { By } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement, Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';

@Component({
    selector: 'app-mock',
    template: '',
})
class MockComponent {}

describe('WelcomeComponent', () => {
    let component: WelcomeComponent;
    let fixture: ComponentFixture<WelcomeComponent>;
    let location: Location;
    let router: Router;
    let de: DebugElement;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule.withRoutes([
                    {
                        path: 'tasks/add',
                        component: MockComponent,
                    },
                ]),
            ],
            declarations: [WelcomeComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(WelcomeComponent);
        router = TestBed.inject(Router);
        location = TestBed.inject(Location);
        component = fixture.componentInstance;
        de = fixture.debugElement;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('should have h1 element width "task" keyword', () => {
        const h1 = de.query(By.css('h1'));
        const el: HTMLElement = h1.nativeElement;
        expect(el.innerText).toContain('task');
    });
    it('should navigate to correct path', fakeAsync(() => {
        const ankor = de.query(By.css('a')).nativeElement;
        ankor.click();
        tick();
        fixture.detectChanges();
        expect(location.path()).toBe('/tasks/add');
    }));
});
