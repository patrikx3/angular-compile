// you need unlinked npm-s!!!

import { TestBed } from '@angular/core/testing';
import { inject } from '@angular/core/testing';

import {CompileHtmlAttribute, CompileHtmlService, P3XCompileHtmlModule } from '../../src'
describe('CompileHtml', () => {
    let service: CompileHtmlService;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
            ],
            declarations: [
                CompileHtmlAttribute
            ],
            providers: [
                CompileHtmlService
            ],
        });
    });

    beforeEach(inject([CompileHtmlService], (_service: CompileHtmlService) => {
        service = _service;
    }));

    it ('CompileHtmlService', (/*done*/) => {
        expect(service instanceof CompileHtmlService).toBeTruthy();
        /*
        setTimeout(()=> {
            console.log('done later');
            done();
        }, 1000);
        */

    });
});