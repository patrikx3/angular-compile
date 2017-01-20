import { TestBed } from '@angular/core/testing';
import { inject } from '@angular/core/testing';

import {CompileHtmlAttribute, CompileHtmlService } from '../../src'
describe('CompileHtml', () => {
    let service: CompileHtmlService;
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

    beforeEach(inject([CompileHtmlService], (_service: CompileHtmlService) => {
        service = _service;
    }));

    it ('CompileHtmlService', (/*done*/) => {
        expect(service instanceof CompileHtmlService).toBeTruthy();

        /*

        setTimeout(()=> {
            console.log('done later');
            done();
        }, 2000);
        */
    });
});