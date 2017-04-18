[//]: #@corifeus-header


[![Build Status](https://travis-ci.org/patrikx3/angular-compile-html.svg?branch=master)](https://travis-ci.org/patrikx3/angular-compile-html)
[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/patrikx3/angular-compile-html/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/patrikx3/angular-compile-html/?branch=master)
[![Code Coverage](https://scrutinizer-ci.com/g/patrikx3/angular-compile-html/badges/coverage.png?b=master)](https://scrutinizer-ci.com/g/patrikx3/angular-compile-html/?branch=master)  [![Trello](https://img.shields.io/badge/Trello-p3x-026aa7.svg)](https://trello.com/b/gqKHzZGy/p3x)

[![NPM](https://nodei.co/npm/p3x-angular-compile-html.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/p3x-angular-compile-html/)


[//]: #@corifeus-header:end

# AOT
Right now Angular does not mix JIT + AOT at once. If you want to create components on the fly, you need JIT and turn off AOT. 

## Reference
https://github.com/angular/angular/issues/16033
   
```bash
Hello,
we don't support mixing JIT and AOT right now. A better way of doing dynamic content is using ComponentFactoryResolver and ViewContainerRef.

It will probably not work with AoT then, as tbosch said, mixing JIT and AOT is not supported (yet?).
```   
   
https://github.com/angular/angular/issues/15510  
https://github.com/angular/angular/issues/11780  

# JIT
There are no issues. You can do anything you want (component / module / everything).


# Use case
Dynamic compile HTML string for Angular v4. 

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
grunt run|default
```

[http://localhost:8080](http://localhost:8080)

## Usage

### HTML
  
```html
 <div #container></div>
 <div   [p3x-compile]="string" 
        [p3x-compile-ctx]="youGetAContextToDoWithItAnything"
        [p3x-compile-imports]="importsLikeMaterialEtcArray">        
</div>
```

### TypeScript
Check out the example, here [test/angular-webpack/angular/page.ts](https://github.com/patrikx3/angular-compile-html/blob/master/test/angular-webpack/angular/page.ts).

### Example 2
Corifeus Web Pages: [Typescript with imports](https://github.com/patrikx3/corifeus-app-web-pages/blob/master/src/angular/modules/cory-page.ts)

## INFO AOT TEST

```bash
git clone https://github.com/patrikx3/angular-compile-html.git
yarn install

# aot test http://localhost:9999
grunt aot-test --verbose

# pure jit http://localhost:8080
grunt run
```

[//]: #@corifeus-footer


---
[**P3X-ANGULAR-COMPILE-HTML**](https://patrikx3.github.com/angular-compile-html) Build v4.0.171-378 on 4/18/2017, 9:05:51 PM

by [Patrik Laszlo](http://patrikx3.tk) 


[//]: #@corifeus-footer:end
