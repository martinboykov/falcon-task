import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SideNavListComponent } from '../side-nav-list/side-nav-list.component';
// tslint:disable-next-line: component-selector
@Component({ selector: 'mat-icon', template: '' })
class MatIconStubComponent {}
// tslint:disable-next-line: component-selector
@Component({ selector: 'mat-toolbar', template: '' })
class MatToolbarStubComponent {}

describe('SideNavListComponent', () => {
    let component: SideNavListComponent;
    let fixture: ComponentFixture<SideNavListComponent>;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [
                SideNavListComponent,
                MatIconStubComponent,
                MatToolbarStubComponent,
            ],
            providers: [],
            schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SideNavListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
