import {
    Component,
    Injectable,
    ViewChild,
    ViewContainerRef,
    OnInit,
    NgModule,
    CUSTOM_ELEMENTS_SCHEMA,
    OnDestroy
} from '@angular/core';

/*
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatCommonModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatLineModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatOptionModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
//    OverlayContainer,
//    MatSelectionList,
} from '@angular/material';
*/

import {
    MatButtonModule,
} from '@angular/material';


@Component({
    selector: 'p3x-compile-test',
    template: `

    <cory-mat-loading [cory-visible]="true"></cory-mat-loading>

    <div style="margin: 40px;">
            <mat-card>
                    <h2>Some helper URL links</h2>

                    <a href="https://pages.corifeus.com/angular-compile" target="p3x-corifeus-pages">pages.corifeus.com</a>
                    <br/>
                    <a href="https://github.com/patrikx3/angular-compile/blob/master/test/angular-webpack/angular/page.ts#L1" target="p3x-corifeus-pages-github">How it works from the code in GitHub</a>
                    <br/>

                    <hr/>

            
                    <h3>Data1</h3>
                    <div [p3x-compile]="data1" [p3x-compile-ctx]="this"></div>

                    <hr/>

                    <h3>Data2</h3>
                    <div [p3x-compile]="data2" [p3x-compile-ctx]="this"></div>

                    <hr/>

                    <h3>Data3</h3>
                    <div [p3x-compile]="data3" [p3x-compile-ctx]="this"></div>


                    <hr/>
                    Hidden is working? If show, below should say "Click me via a service!"
                    <br/>
                    <div *ngIf="false" [p3x-compile]="data2" [p3x-compile-ctx]="this"></div>
                    <br/>
                    If there was no "Click me via a service!" above, it works.

                    <hr/>

                    <h3>Data2 - This always visible</h3>
                    <div *ngIf="true" [p3x-compile]="data2" [p3x-compile-ctx]="this"></div>


                    <hr/>

                    <h3>Router Link</h3>
                    <div [p3x-compile]="dataRouterLink" [p3x-compile-ctx]="this"></div>
                    
          <!--          <div>{{ dataRouterLink }}</div> -->
                    <br/>

                    <button mat-button mat-raised-button color="primary" (click)="randomRouterLink()">Generate new router link</button>

                    <hr/>

                    <h3>Router Link Compiled</h3>
                    <div [p3x-compile]="dataMaterial" [p3x-compile-ctx]="this" [p3x-compile-module]="dataMaterailModule"></div>
                    
            </mat-card>
        </div>
    `
})
@Injectable()
export class Page implements OnInit, OnDestroy {

    data1: string;
    data2: string = 'init';

    data3: string = 'Just simple string <span style="color: red;">red</span>';

    counter1: number = 0;
    counter2: number = 0;

    interval: any;

    dataRouterLink: string = ''

    compileForm: string = ``

    dataMaterialDefault: string = `
    <button mat-button mat-raised-button color="primary" (click)="context.randomRouterLink()">Generate new router link</button>
    `
    dataMaterial: string = `
    <button mat-button mat-raised-button color="primary" (click)="context.randomRouterLink()">Generate new router link</button>
    `
    dataMaterailModule : any =  {
        //                schemas: [CUSTOM_ELEMENTS_SCHEMA],
        //                declarations: [],
                        imports: [
                            MatButtonModule
                        ],
                        exports: [
        
                        ]
        
                    }

    constructor(
    //    private compileHtmlService: CompileService
    ) {
    }

    private update1() {
        this.counter1++;
        this.data1 = `
<div>P3X Angular Compile</div><a id="button-container" href="javascript:void(0);" (click)="context.update1()">Click me via a angular compile!</a>
<div id="counter-container">{{ context.counter1}}</div>
`;
    }

    public formClick() {
        alert('form click');
    }

    private update2() {
        this.counter2++;
        this.data2 = `
<div>Attribute</div><a id="button-attribute" href="javascript:void(0);" (click)="context.update2()">Click me via an other attribute!</a>
<div id="counter-attribute">{{ context.counter2}}</div>
`;

    }

    chars: string = 'abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'

    getRandomChar() {
        return this.chars[Math.floor(Math.random() * (62 - 0)) + 0]
    }

    randomRouterLink() {
        let counter = 0;
        let randomString = '';
        let randomString2 = '';
        
        while (counter < 10) {
            counter++;
            randomString += this.getRandomChar();
            randomString2 += this.getRandomChar();
        }
        this.dataRouterLink = `<a href="javascript:void(0)" routerLink="${randomString}">${randomString}</a>`
        this.dataMaterial = `
        <a href="javascript:void(0)" routerLink="${randomString2}">${randomString2}</a>
            <br/>
            ${this.dataMaterialDefault}
        `
    }

    ngOnInit() {
        this.update1();
        this.update2();
        this.randomRouterLink()
        /*
                let is = false;
                let newData = '<span>123</span>';
                let defaultData = '';
                let count = 0;

                this.interval = setInterval(() => {
                    is = !is;
                    if (is) {
                        count++;
                        defaultData = defaultData + newData;
                        this.data3 = defaultData + defaultData;
                        if (count > 10) {
                            count = 0;
                            defaultData = newData;
                        }
                    } else {
                        this.data3 = '<div>321</div>'
                    }
                }, 1000)
                */
    }

    ngOnDestroy() {
        clearInterval(this.interval);
    }
}