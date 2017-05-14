[//]: #@corifeus-header


---

# Angular Dynamic Compile service and directive

### Node Version Requirement 
``` 
>=7.8.0 
```  
   
The ```async``` and ```await``` keywords are required.

Install NodeJs:    
https://nodejs.org/en/download/package-manager/    
  
# Description


[//]: #@corifeus-header:end

# Use case
Dynamic compile components by a string template for Angular. You can provide a context, that you can use with anything (for clicking for free etc..) 

**The old ```angular-compile-html```.**

## NPM & Version
It is a ```CommonJS``` bundle.
The version reflects the Angular version (```AngularMajor.AngularMinor.Build-Commit```).

## Install
  
```bash
npm install --save p3x-angular-compile
# or
yarn add p3x-angular-compile
```

## AOT + JIT
It is not working out of the box (the default is either JIT or AOT, not both), but the apps become 10 folds faster. The ``@ngtools/webpack`` is AOT and the ```awesome-typescript-loader``` is JIT only. 
  
The solution can be architect with the ```@angular/compiler``` and the ```awesome-typescript-loader``` together. A miracle!

Example here:
[More info about AOT + JIT](https://pages.corifeus.tk/github/corifeus-builder-angular/artifacts/readme/skeleton.html)

### Size
If you want very small bundle, use ```gzip```.

## Usage

### HTML
  
```html
 <div #container></div>
 <div   [p3x-compile]="string" 
        [p3x-compile-ctx]="youGetAContextToDoWithItAnything"
        [p3x-compile-imports]="importsLikeMaterialEtcArray">        
</div>
```

### Options
The templates are cached.

```typescript
export interface CompileOptions {
    template: string;
    container: ViewContainerRef;
    imports?: Array<Type<any> | ModuleWithProviders | any[]>;
    context?: any,
    onCompiled?: Function,
    onError?: Function;
}
```

### Example
Check out the example, here [test/angular-webpack/angular/page.ts](https://github.com/patrikx3/angular-compile-html/blob/master/test/angular-webpack/angular/page.ts).

### Deployed example
[Corifeus Pages (JIT + AOT at once)](https://pages.corifeus.tk)
  
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




[//]: #@corifeus-footer

---
[**P3X-ANGULAR-COMPILE**](https://patrikx3.github.com/angular-compile) Build v4.1.247-5

by [Patrik Laszlo](http://patrikx3.tk) 

[//]: #@corifeus-footer:end
