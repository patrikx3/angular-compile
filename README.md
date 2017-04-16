[//]: #@corifeus-header


[![Build Status](https://travis-ci.org/patrikx3/angular-compile-html.svg?branch=master)](https://travis-ci.org/patrikx3/angular-compile-html)
[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/patrikx3/angular-compile-html/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/patrikx3/angular-compile-html/?branch=master)
[![Code Coverage](https://scrutinizer-ci.com/g/patrikx3/angular-compile-html/badges/coverage.png?b=master)](https://scrutinizer-ci.com/g/patrikx3/angular-compile-html/?branch=master)  [![Trello](https://img.shields.io/badge/Trello-p3x-026aa7.svg)](https://trello.com/b/gqKHzZGy/p3x)

[![NPM](https://nodei.co/npm/p3x-angular-compile-html.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/p3x-angular-compile-html/)


[//]: #@corifeus-header:end

# AOT + JIT
Working it out right now, so it only works with JIT for the moment. 

## Reference
https://github.com/angular/angular/issues/15510  
https://github.com/angular/angular/issues/11780  

# Dynamic component
Service / attribute to compile an HTML string into an Angular 2+ to into a component. It is pure ```TypeScript```.

## Install
  
```bash
npm install p3x-angular-compile-html
```

## Dev environment end test
   
```bash
npm install -g yarn
git clone https://github.com/patrikx3/angular-compile-html.git
cd angular-compile-html
yarn install
node node_modules/protractor/bin/webdriver-manager update
grunt default|run
```

[http://localhost:8080](http://localhost:8080)

## Usage

### HTML
  
```html
 <div #container></div>
 <div [p3x-compile]="data2" [p3x-compile-ref]="ref" [p3x-compile-imports]="importsLikeMaterialEtc"></div>
```

### TypeScript
Check out the example, here [test/angular-webpack/angular/page.ts](https://github.com/patrikx3/angular-compile-html/blob/master/test/angular-webpack/angular/page.ts).

### Example 2
Corifeus Web Pages: [Typescript with imports](https://github.com/patrikx3/corifeus-app-web-pages/blob/master/src/angular/modules/cory-page.ts)

### Info
Angular 2+ uses camelCase attributes, for me it is still HTML, so my selectors always ```kebab-case```.


### AOT INFO
```typesciprt
import {Compiler } from '@angular/core';
import {JitCompilerFactory} from '@angular/compiler';
export function createJitCompiler () {
    return new JitCompilerFactory([{useDebug: false, useJit: true}]).createCompiler();
}

const = providers: [
        { provide: Compiler, useFactory:  createJitCompiler},
   ]
```

[//]: #@corifeus-footer


---
[**P3X-ANGULAR-COMPILE-HTML**](https://patrikx3.github.com/angular-compile-html) Build v4.0.162-283 on 4/16/2017, 6:02:12 PM

by [Patrik Laszlo](http://patrikx3.tk) 


[//]: #@corifeus-footer:end
