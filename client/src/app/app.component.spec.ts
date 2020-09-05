import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';


describe('AppComponent', () => {
    let app: AppComponent;
    let fixture: ComponentFixture<AppComponent>;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [AppComponent],
            providers: [],
            schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
        }).compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(AppComponent);
        app = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create the app', () => {
        expect(app).toBeTruthy();
    });
});
