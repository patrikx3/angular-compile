[//]: #@corifeus-header
  
[![NPM](https://nodei.co/npm/p3x-angular-compile.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/p3x-angular-compile/)

  [![Build Status](https://travis-ci.org/patrikx3/angular-compile.svg?branch=master)](https://travis-ci.org/patrikx3/angular-compile)  [![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/patrikx3/angular-compile/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/patrikx3/angular-compile/?branch=master)  [![Code Coverage](https://scrutinizer-ci.com/g/patrikx3/angular-compile/badges/coverage.png?b=master)](https://scrutinizer-ci.com/g/patrikx3/angular-compile/?branch=master) 


 
# 🆖 Angular Dynamic Compile component, that turns a string into a compiled component v6.0.16-371  

This is an open-source project. Star this repository if you like it, or even donate!  Thank you so much! :)

I run my own server with dynamic IP address so it may happen that the server can not be reachable for about max 15 minutes due to the dynamic DNS. The server may also be unreachable when I backup the SSD with Clonzilla (very rarely) or an electrical issue (but this should not happen again). When the server is down, please hang on for 15-30 minutes and the server will be back up.

All my domains (patrikx3.com and corifeus.com) could have errors since I am developing in my free time. However, it is usually stable.


### Node Version Requirement 
``` 
>=10.0.0 
```  
   
### Built on Node 
``` 
v10.1.0
```   
   
The ```async``` and ```await``` keywords are required.

Install NodeJs:    
https://nodejs.org/en/download/package-manager/    


# Built on Angular

```text
6.0.2
```
            


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
            // module = NgModule
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
    
```html
 <div *ngIf="true" 
 [p3x-compile]="data"
 [p3x-compile-ctx]="this"
 [p3x-compile-error-handler]="anyFunctionThatTakesAnExceptionObject"
 [p3x-compile-module]="youCanConfigureTheCompileNgModuleForAngular5NotNeeded"
 [p3x-compile-imports]="ifForSomeReasonADirectiveIsNotWorkingYouCanAddInForAngular5NotNeeded"
 >     
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


<!--

#### Actual used dynamic compiler
I use a dynamic Markdown page with ```p3x-angular-compile```:
[Module](https://github.com/patrikx3/corifeus-app-web-pages/blob/master/src/angular/module.ts) , [Example page](https://github.com/patrikx3/corifeus-app-web-pages/blob/master/src/angular/modules/cory-page.ts)


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

<!--

### Deployed example
[Corifeus Pages (JIT + AOT at once)](https://pages.corifeus.com)

#### For now, until there is no options in Angular to use JIT, I just use AOT, so I don't use this component  

[Corifeus Pages (AOT)](https://pages.corifeus.com)

  
[https://github.com/patrikx3/corifeus-app-web-pages/blob/master/src/angular/modules/cory-page.ts](https://github.com/patrikx3/corifeus-app-web-pages/blob/master/src/angular/modules/cory-page.ts)

  -->


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

[**P3X-ANGULAR-COMPILE**](https://pages.corifeus.com/angular-compile) Build v6.0.16-371 

[![Like Corifeus @ Facebook](https://img.shields.io/badge/LIKE-Corifeus-3b5998.svg)](https://www.facebook.com/corifeus.software) [![Donate for Corifeus / P3X](https://img.shields.io/badge/Donate-Corifeus-003087.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=QZVM4V6HVZJW6)  [![Contact Corifeus / P3X](https://img.shields.io/badge/Contact-P3X-ff9900.svg)](https://www.patrikx3.com/en/front/contact) 


## P3X Sponsors

[IntelliJ - The most intelligent Java IDE](https://www.jetbrains.com)
  
[![JetBrains](https://cdn.corifeus.com/assets/svg/jetbrains-logo.svg)](https://www.jetbrains.com/) [![NoSQLBooster](https://cdn.corifeus.com/assets/png/nosqlbooster-70x70.png)](https://www.nosqlbooster.com/)

[The Smartest IDE for MongoDB](https://www.nosqlbooster.com)
  
  
 

[//]: #@corifeus-footer:end