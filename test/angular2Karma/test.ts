import { TestBed } from '@angular/core/testing';

import {CompileHtmlAttribute, CompileHtmlService } from '../../src'
describe('CompileHtml', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                CompileHtmlAttribute
            ],
            providers: [
                CompileHtmlService
            ],
        });
    });
    it ('should work', () => {
//        let fixture = TestBed.createComponent(Page);
//        expect(fixture.componentInstance instanceof Page).toBe(true, 'should create a Page');
    });
});