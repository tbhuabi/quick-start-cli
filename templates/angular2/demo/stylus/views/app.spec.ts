import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { AppComponent } from './app';
import { PageHeaderComponent } from '../components/page-header/page-header';
import { PageFooterComponent } from '../components/page-footer/page-footer';

let component: AppComponent;
let fixture: ComponentFixture<AppComponent>;
let debugElement: DebugElement;
let htmlElement: HTMLElement;

describe('App', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [AppComponent, PageHeaderComponent, PageFooterComponent]
        });
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;

        debugElement = fixture.debugElement.query(By.css('h1'));
        htmlElement = debugElement.nativeElement;

    });
    it('h1的文本是test', () => {
        expect(htmlElement.textContent).toContain('test');
    });
});
