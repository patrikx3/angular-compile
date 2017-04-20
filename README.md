[//]: #@corifeus-header


[![Build Status](https://travis-ci.org/patrikx3/angular-compile-html.svg?branch=master)](https://travis-ci.org/patrikx3/angular-compile-html)
[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/patrikx3/angular-compile-html/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/patrikx3/angular-compile-html/?branch=master)
[![Code Coverage](https://scrutinizer-ci.com/g/patrikx3/angular-compile-html/badges/coverage.png?b=master)](https://scrutinizer-ci.com/g/patrikx3/angular-compile-html/?branch=master)  [![Trello](https://img.shields.io/badge/Trello-p3x-026aa7.svg)](https://trello.com/b/gqKHzZGy/p3x)

[![NPM](https://nodei.co/npm/p3x-angular-compile-html.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/p3x-angular-compile-html/)


[//]: #@corifeus-header:end

# Use case
Dynamic compile HTML string for Angular v4. 

## Install
  
```bash
npm install --save p3x-angular-compile-html
# or
yarn add p3x-angular-compile-html
```

## AOT + JIT
It is not working out of the box (the default is either JIT or AOT, not both), but the apps become 10 folds faster. The ``@ngtools/webpack`` is AOT the ```awesome-typescript-loader``` is JIT only. 
  
The solution: I am using the ```@angular/compiler``` and the ```awesome-typescipt-loader``` together and it works. Miracle!

To make it work, just fork my repo: https://github.com/patrikx3/corifeus-app-web-pages

You put all code into ```src/angular```.
```bash
grunt aot-awesome
```
Voila!

### Help
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

### Example
Check out the example, here [test/angular-webpack/angular/page.ts](https://github.com/patrikx3/angular-compile-html/blob/master/test/angular-webpack/angular/page.ts).

### Deployed example
[Corifeus Pages (JIT + AOT at once)](https://pages.corifeus.tk)
  
[https://github.com/patrikx3/corifeus-app-web-pages/blob/master/src/angular/modules/cory-page.ts](https://github.com/patrikx3/corifeus-app-web-pages/blob/master/src/angular/modules/cory-page.ts)

## Dev environment end test
   
```bash
npm install -g yarn
git clone https://github.com/patrikx3/angular-compile-html.git
cd angular-compile-html
yarn install
grunt run|default
```

[http://localhost:8080](http://localhost:8080)



[//]: #@corifeus-footer


---
[**P3X-ANGULAR-COMPILE-HTML**](https://patrikx3.github.com/angular-compile-html) Build v4.0.181-469 on 4/20/2017, 1:17:08 PM

by [Patrik Laszlo](http://patrikx3.tk) 


[//]: #@corifeus-footer:end