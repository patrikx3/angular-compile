import 'corifeus-web-material/src/bundle'


import {enableProdMode} from '@angular/core';

enableProdMode();

//import 'corifeus-web/src/bundle';
import {platformBrowser} from '@angular/platform-browser';
import {ModuleNgFactory} from './module.ngfactory';

platformBrowser().bootstrapModuleFactory(ModuleNgFactory);



