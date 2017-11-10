[//]: #@corifeus-header

  [![Build Status](https://travis-ci.org/patrikx3/angular-compile.svg?branch=master)](https://travis-ci.org/patrikx3/angular-compile)  [![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/patrikx3/angular-compile/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/patrikx3/angular-compile/?branch=master)  [![Code Coverage](https://scrutinizer-ci.com/g/patrikx3/angular-compile/badges/coverage.png?b=master)](https://scrutinizer-ci.com/g/patrikx3/angular-compile/?branch=master) 

  
[![NPM](https://nodei.co/npm/p3x-angular-compile.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/p3x-angular-compile/)
---

 
# Angular Dynamic Compile component, that turns a string into a compiled component v5.0.44-205  

This is an open source project. Just code.

### Node Version Requirement 
``` 
>=8.9.0 
```  
   
### Built on Node 
``` 
v9.1.0
```   
   
The ```async``` and ```await``` keywords are required.

Install NodeJs:    
https://nodejs.org/en/download/package-manager/    

# Description  

                        
[//]: #@corifeus-header:end


# Use case
Dynamic compile components by a string template for Angular. You can provide a context, that you can use with anything (for clicking for free etc..) 

## NPM & Version
It is a ```CommonJS``` bundle.
The version reflects the Angular version (```AngularMajor.AngularMinor.Build-Commit```).

You can find out your proper version with this command:
```bash
npm show p3x-angular-compile versions --json
```

## Install
  
```bash
npm install --save p3x-angular-compile
# or
yarn add p3x-angular-compile
```

## AOT + JIT

### Angular 5.x.x +

For now we cannot use AOT + JIT at once. It is too new, we will need more releases and new functions that are removed.

#### Info
https://github.com/angular/angular/issues/20156

On the bottom, you can see:
```text
To reduce the payload we do not ship the compiler in AoT
```

So right now, it is not possible.

### Angular 4.x.x

It is not working out of the box (the default is either JIT or AOT, not both), but the apps become 10 folds faster. The ``@ngtools/webpack`` is AOT and the ```awesome-typescript-loader``` is JIT only. 
  
The solution can be architect with the ```@angular/compiler``` and the ```awesome-typescript-loader``` together. A miracle!

Example here (since I am using Angular 5 not, it is not AOT + JIT anymore, but if you are on Angular 4, you can do it):
[More info about AOT + JIT](https://pages.corifeus.com/github/corifeus-builder-angular/artifacts/readme/skeleton.html)

### Size
If you want very small bundle, use ```gzip```.

## Usage

```typescript
import { CompileModule} from "p3x-angular-compile"

// the module settings
@NgModule({
    imports: [
        // multiple directives in a shared module like this
        CorifeusWebMaterialModule,
        
        // usually it is enough
        CompileModule,
        
        // usually it is not required anymore
        // since Angular 5 changed
        // but if there is something missing,
        // you can add in as before
        CompileModule.forRoot({
            module: {
                schemas: [CUSTOM_ELEMENTS_SCHEMA],
                declarations: [MyDynamicElement ],
                // though you are better a shared component like
                imports: [
                    CorifeusWebMaterialModule
                ]
                
            }
        })
    ],
    declarations: [
        Page,
    ],
    providers: [
    ],
    bootstrap: [ Page ]
})
export class Module { };
```
    
```text
 <div *ngIf="true" 
 [p3x-compile]="data"
 [p3x-compile-ctx]="this"
 [p3x-compile-modul]="youCanConfigureTheCompileNgModule"
 [p3x-compile-imports]="ifForSomeReasonADirectiveIsNotWorkingYouCanAddIn">     
</div>
```

```typescript
// a page example
export class Page {

    data: string = "<div (click)="context.alert()">It is working</div>";

    alert() {
        alert('ok');
    }
}
```

#### Actual used dynamic compiler
I use a dynamic Markdown page with ```p3x-angular-compile```:
[Module](https://github.com/patrikx3/corifeus-app-web-pages/blob/master/src/angular/module.ts) , [Example page](https://github.com/patrikx3/corifeus-app-web-pages/blob/master/src/angular/modules/cory-page.ts)

<!--

#### Service
[Please refer to use an a service](https://github.com/patrikx3/angular-compile/blob/master/test/angular-webpack/angular/page.ts)

```typescript
export interface CompileOptions {   
    // cached by template
    template: string;
    container: ViewContainerRef;
    context?: any,
    
    // you can customize here any you want to
    // CommonModule, BrowserModule are auto added 
    // (like *ngIf and angular default directives)
    // though CompileModule.forRoot is usually enough
    // so you do not need to use it
    module?: NgModule;
    
    onCompiled?: Function,
    onError?: Function;

}
```

-->

### Options
[Reference for the Angular module settings.](
https://github.com/angular/angular/blob/master/packages/core/src/metadata/ng_module.ts)

<!--
The templates are cached.
-->

### Deployed example
<!--
[Corifeus Pages (JIT + AOT at once)](https://pages.corifeus.com)
  -->

[Corifeus Pages (JIT)](https://pages.corifeus.com)

  
[https://github.com/patrikx3/corifeus-app-web-pages/blob/master/src/angular/modules/cory-page.ts](https://github.com/patrikx3/corifeus-app-web-pages/blob/master/src/angular/modules/cory-page.ts)

## Dev environment end test
   
```bash
npm install -g yarn
git clone https://github.com/patrikx3/angular-compile.git
cd angular-compile
yarn install
grunt run|default
```

[http://localhost:8080](http://localhost:8080)



# Errors

## Type x is part of the declarations of 2 modules
 
Basically, you need a shared component.
 
https://stackoverflow.com/questions/42993580/angular-2-type-childcomponent-is-a-part-of-the-declarations-of-2-modules-par


[//]: #@corifeus-footer

---

[**P3X-ANGULAR-COMPILE**](https://pages.corifeus.com/angular-compile) Build v5.0.44-205 

[![Like Corifeus @ Facebook](https://img.shields.io/badge/LIKE-Corifeus-3b5998.svg)](https://www.facebook.com/corifeus.software) [![Donate for Corifeus / P3X](https://img.shields.io/badge/Donate-Corifeus-003087.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=LFRV89WPRMMVE&lc=HU&item_name=Patrik%20Laszlo&item_number=patrikx3&currency_code=HUF&bn=PP%2dDonationsBF%3abtn_donate_SM%2egif%3aNonHosted) 


 

[//]: #@corifeus-footer:end
