import {enableProdMode} from '@angular/core';

declare var process: any;
if (process.env === 'production') {
    enableProdMode();
}

import './modules/material/bundle'

import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {Module} from './module';

platformBrowserDynamic().bootstrapModule(Module);


