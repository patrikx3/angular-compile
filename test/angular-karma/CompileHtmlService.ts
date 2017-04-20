import { TestBed } from '@angular/core/testing';
import { inject } from '@angular/core/testing';

import {CompileHtmlAttribute, CompileHtmlService, P3XCompileHtmlModule } from '../../src'
describe('CompileHtml', () => {
    let service: CompileHtmlService;
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ CompileHtmlService ], // declare the test component
        });

        let fixture = TestBed.createComponent(CompileHtmlService);

    });

    /*
    beforeEach(inject([CompileHtmlService], (_service: CompileHtmlService) => {
        service = _service;
        expect(service !== null).toBeTruthy();
    }));
*/

    it ('CompileHtmlService', (/*done*/) => {
//        expect(service instanceof CompileHtmlService).toBeTruthy();
        /*
        setTimeout(()=> {
            console.log('done later');
            done();
        }, 1000);
        */

    });
});