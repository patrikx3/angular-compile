// you need unlinked npm-s!!!

import { TestBed } from '@angular/core/testing';
import { inject } from '@angular/core/testing';

import {CompileAttribute, CompileService  } from '../../src'
describe('CompileHtml', () => {
    let service: CompileService;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
            ],
            declarations: [
                CompileAttribute
            ],
            providers: [
                CompileService
            ],
        });
    });

    beforeEach(inject([CompileService], (_service: CompileService) => {
        service = _service;
    }));

    it ('CompileService', (/*done*/) => {
//        expect(service instanceof CompileService).toBeTruthy();
        /*
        setTimeout(()=> {
            console.log('done later');
            done();
        }, 1000);
        */

    });
});