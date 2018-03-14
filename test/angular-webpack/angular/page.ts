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

@Component({
    selector: 'p3x-compile-test',
    template: `

        <div class="cory-mat-container">
            <mat-card>
                <mat-card-content>

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

                    <button (click)="randomRouterLink()">Generate new router link</button>

                    <h3>Dynamic form</h3>
                    <div [p3x-compile]="compileForm" [p3x-compile-ctx]="this"></div>

                    <button mat-raised-button color="primary" (click)="formClick()">
                        Verify
                    </button>

                    <button mat-raised-button color="primary" (click)="formClick()">
                        Prolongate
                    </button>
                    
                </mat-card-content>
            </mat-card>
        </div>
        
        <!--        <cory-mat-loading [cory-visible]="true">sss</cory-mat-loading> -->


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

    compileForm: string = `
    
   
        <div class="flex-container">
            <div class="row">
                <div class="flex-item">
                   <!-- <cory-mat-login></cory-mat-login> -->
                                        
                    <br/>

                                       
                    <button mat-raised-button color="primary" (click)="context.formClick()">
                        Verify
                    </button>
                    
                    <button mat-raised-button color="primary" (click)="context.formClick()">
                        Prolongate
                    </button>
                </div>
            </div>
        </div>    
`

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
        while (counter < 10) {
            counter++;
            randomString += this.getRandomChar();
        }
        this.dataRouterLink = `<a href="javascript:void(0)" routerLink="${randomString}">${randomString}</a>`
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