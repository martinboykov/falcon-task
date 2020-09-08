import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeComponent } from './welcome.component';
import { By } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('WelcomeComponent', () => {
    let component: WelcomeComponent;
    let fixture: ComponentFixture<WelcomeComponent>;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [WelcomeComponent],
            schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(WelcomeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('should have h1 element width "task" keyword', () => {
        const de = fixture.debugElement.query(By.css('h1'));
        const el: HTMLElement = de.nativeElement;
        expect(el.innerText).toContain('task');
    });
});
