import { enableProdMode } from '@angular/core';

if (process.env.ENV === 'production') {
    enableProdMode();
}

import 'corifeus-web-material/src/bundle'


import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import {Module} from './module';
platformBrowserDynamic().bootstrapModule(Module);


