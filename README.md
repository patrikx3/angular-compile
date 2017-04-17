[//]: #@corifeus-header


[![Build Status](https://travis-ci.org/patrikx3/angular-compile-html.svg?branch=master)](https://travis-ci.org/patrikx3/angular-compile-html)
[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/patrikx3/angular-compile-html/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/patrikx3/angular-compile-html/?branch=master)
[![Code Coverage](https://scrutinizer-ci.com/g/patrikx3/angular-compile-html/badges/coverage.png?b=master)](https://scrutinizer-ci.com/g/patrikx3/angular-compile-html/?branch=master)  [![Trello](https://img.shields.io/badge/Trello-p3x-026aa7.svg)](https://trello.com/b/gqKHzZGy/p3x)

[![NPM](https://nodei.co/npm/p3x-angular-compile-html.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/p3x-angular-compile-html/)


[//]: #@corifeus-header:end

# AOT + JIT
Mixing pure JIT (anything) + AOT at the once is not support by Google.

## Reference
https://github.com/angular/angular/issues/16033#issuecomment-294537684   
https://github.com/angular/angular/issues/15510  
https://github.com/angular/angular/issues/11780  

# Use case
Dynamic compile HTML string for Angular 2+. 

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
 <div [p3x-compile]="string" [p3x-compile-ref]="youGetInYourTemplateAsRef" [p3x-compile-imports]="importsLikeMaterialEtcArray"></div>
```

### TypeScript
Check out the example, here [test/angular-webpack/angular/page.ts](https://github.com/patrikx3/angular-compile-html/blob/master/test/angular-webpack/angular/page.ts).

### Example 2
Corifeus Web Pages: [Typescript with imports](https://github.com/patrikx3/corifeus-app-web-pages/blob/master/src/angular/modules/cory-page.ts)

## INFO AOT TEST

```bash
# aot test http://localhost:9999
yarn install
grunt aot-test --verbose

# pure jit http://localhost:8080
grunt run
```

[//]: #@corifeus-footer


---
[**P3X-ANGULAR-COMPILE-HTML**](https://patrikx3.github.com/angular-compile-html) Build v4.0.166-304 on 4/17/2017, 8:48:26 PM

by [Patrik Laszlo](http://patrikx3.tk) 


[//]: #@corifeus-footer:end
