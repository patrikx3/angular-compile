# ng2-compile-html

[![Build Status](https://travis-ci.org/patrikx3/ng2-compile-html.svg?branch=master)](https://travis-ci.org/patrikx3/ng2-compile-html)

Angular 2 Service/Attribute to compile an HTML into a component

It is only using ```TypeScript``` right now. It can be built though.
  
##Install
  
```bash
npm install p3x-ng2-compile-html
```

##Test
   
```bash
git clone https://github.com/patrikx3/ng2-compile-html.git
cd ng2-compile-html
npm install
grunt run
```

[http://localhost:8080](http://localhost:8080)

##Usage
Check out the example, here [test/angular2/app/Page.ts](test/angular2/app/Page.ts).

###HTML
  
```html
 <div #container></div>
 <div [p3xCompileHtml]="data2" [p3xCompileHtmlRef]="ref"></div>
```

###TypeScript
  
```typescript
import {
    Component,
    Injectable,
    ViewChild,
    ViewContainerRef,
    OnInit
} from '@angular/core';

import {CompileHtmlService } from '../../../src';

@Component({
    selector: 'p3x-ng2-compile-html-test',
    template: `
    <div #container></div>
    <hr/>
    <div [p3xCompileHtml]="data2" [p3xCompileHtmlRef]="ref"></div>
`,
})
@Injectable()
export class Page implements OnInit {

    @ViewChild('container', {read: ViewContainerRef}) container: ViewContainerRef;

    data1: string;
    data2: string;

    ref: Page;

    counter1 : number = 0;
    counter2 : number = 0;

    constructor( private compileHtmlService: CompileHtmlService ) {
        this.ref = this;
    }

    private update1() {
        this.counter1++;
        this.data1 = `
<div>Service</div><a href="javascript:void(0);" (click)="ref.update1()">Click me via a service!</a>
<div>${this.counter1}</div>
`;
        this.compileHtmlService.compile({
            template: this.data1,
            container: this.container,
            ref: this,
        })
    }

    private update2() {
        this.counter2++;
        this.data2 = `
<div>Attribute</div><a href="javascript:void(0);" (click)="ref.update2()">Click me via a service!</a>
<div>${this.counter2}</div>
`;
    }

    ngOnInit() {
        this.update1();
        this.update2();
    }

}
```

by [Patrik Laszlo](http://patrikx3.tk)
