import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { HomeComponent } from './home';

let component: HomeComponent;
let fixture: ComponentFixture<HomeComponent>;
let debugElement: DebugElement;
let htmlElement: HTMLElement;

describe('Home', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [HomeComponent]
        });
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;

        debugElement = fixture.debugElement.query(By.css('p'));
        htmlElement = debugElement.nativeElement;

    });
    it('p的文本是简单 快速 高效', () => {
        expect(htmlElement.textContent).toContain('简单 快速 高效');
    });
});
