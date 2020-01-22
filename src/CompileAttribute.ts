import {
    Component,
    Input,
    Injectable,
    //   OnInit,
    OnChanges,
    SimpleChanges,
    Type,
    ModuleWithProviders,
    NgModule,
    Compiler,
    NgModuleFactory,
    //  Inject,
} from '@angular/core';

import {CommonModule} from '@angular/common';
//import { BrowserModule } from '@angular/platform-browser';

//let SingletonDefaultModule: NgModule;

import {cloneDeep} from 'lodash';
//import { CorifeusMaterialModule } from 'corifeus-web-material';

function reverse(str: string) {
    return str.split('').reverse().join('')
}

function random() {
    return (Math.floor(Math.random() * (99999999999999999 - 10000000000000000)) + 10000000000000000).toString(16)
}

let currentIdTime: number;
let currentId = 0;
function nextId() : string{

    const now = Date.now();
    if (currentIdTime !== now) {
        currentId = 0;
        currentIdTime = now
    }
    const comingId = ++currentId;
    const randomHex = reverse(random()).padStart(15, '0');
    const timeHex = reverse(currentIdTime.toString(16).padStart(12, '0'))
    const comingIdHex = reverse(comingId.toString(16).padStart(3, '0'))
    const newId : string = `p3x-angular-compile-${timeHex}${comingIdHex}${randomHex}`;
    //console.log(newId)
    return newId
}


//const cache : any = {};

@Component({
    selector: '[p3x-compile]',
    template: `
        <ng-container *ngIf="html !== undefined && html !== null && html.trim() !== ''">
            <ng-container *ngComponentOutlet="dynamicComponent; ngModuleFactory: dynamicModule;"></ng-container>
        </ng-container>
    `
})
@Injectable()
export class CompileAttribute implements OnChanges {
//export class CompileAttribute implements OnChanges ,OnInit {

    @Input('p3x-compile')
    html: string;

    @Input('p3x-compile-ctx')
    context: any;

    @Input('p3x-compile-error-handler')
    errorHandler: Function = undefined;

    dynamicComponent: any;
    dynamicModule: NgModuleFactory<any> | any;

    @Input('p3x-compile-module')
    module: NgModule;

    @Input('p3x-compile-imports')
    imports: Array<Type<any> | ModuleWithProviders | any[]>;

    constructor(
        //  private container: ViewContainerRef,
        // private service: CompileService
        private compiler: Compiler,
        // @Inject('config') private config:CompileServiceConfig
    ) {
    }

    /*
    // not requires, since ngOnChanges does it first time change
    ngOnInit() {
        //console.log('ng init')
       // this.update();
    }
     */

    ngOnChanges(changes: SimpleChanges) {
        //console.log('ng one changes')
        this.update();
    }


    update() {
        try {
            if (this.html === undefined || this.html === null || this.html.trim() === '') {
                //            this.container.clear();
                this.dynamicComponent = undefined;
                this.dynamicModule = undefined;
                return;
            }

            /*

            // looks like Angular already is caching

            //console.log('html', this.html)
            const cacheKey = this.html;
            //console.log(Object.keys(cache).indexOf(cacheKey), cache)
            if (cache.hasOwnProperty(cacheKey)) {
                const currentCache = cache[cacheKey];
                this.dynamicComponent = currentCache.dynamicComponent
                this.dynamicModule = currentCache.dynamicModule
                return ;
            }
            */
            this.dynamicComponent = this.createNewComponent(this.html, this.context);
            this.dynamicModule = this.compiler.compileModuleSync(this.createComponentModule(this.dynamicComponent));

            /*
            cache[cacheKey] = {
                dynamicComponent: this.dynamicComponent,
                dynamicModule: this.dynamicModule,
            };
            */
        } catch (e) {
            if (this.errorHandler === undefined) {
                throw e;
            } else {
                this.errorHandler(e);
            }
        }
        /*
        // now we use it with ngComponentOutlet, since about angular 5
        await this.service.compile({
            template: this.html,
            container: this.container,
            context: this.context,
            imports: this.imports,
            module: this.module
        })
        */
    }

    private createComponentModule(componentType: any) {
        let module: NgModule = {};

        if (this.module !== undefined) {
            module = cloneDeep(this.module);
        }
        /*
        else if (SingletonDefaultModule !== undefined && SingletonDefaultModule !== null) {
            module = cloneDeep(SingletonDefaultModule);
        }
        */
        module.imports = module.imports || [];
        module.imports.push(CommonModule);
        if (this.imports !== undefined) {
            module.imports = module.imports.concat(this.imports)
        }
        if (module.declarations === undefined) {
            module.declarations = [
                componentType
            ];
        } else {
            module.declarations.push(componentType);
        }
        module.entryComponents = [
            componentType
        ];

        @NgModule(module)
        class RuntimeComponentModule {
        }

        return RuntimeComponentModule;
    }


    private createNewComponent(html: string, context: any) {

        @Component({
            selector: nextId(),
            template: html
        })
        class DynamicComponent {
            context: any = context;
        }

        return DynamicComponent;
    }
}
