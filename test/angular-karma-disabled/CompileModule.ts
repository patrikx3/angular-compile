// you need unlinked npm-s!!!
import {TestBed} from '@angular/core/testing';
import {inject} from '@angular/core/testing';

import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';

import {CompileAttribute} from '../../src/CompileAttribute'

describe('CompileModule', () => {
    let attribute: CompileAttribute;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                CommonModule,
                BrowserModule
            ],
            declarations: [
                CompileAttribute
            ],
            providers: [],
        });
    });

    /*
    beforeEach(inject([CompileAttribute], (_attribute: CompileAttribute) => {
        attribute = _attribute;
    }));
*/
    it('CompileAttribute', (/*done*/) => {
//        expect(service instanceof CompileService).toBeTruthy();
        /*
        setTimeout(()=> {
            console.log('done later');
            done();
        }, 1000);
        */

    });
});
