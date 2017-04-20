import { enableProdMode } from '@angular/core';
enableProdMode();

import 'corifeus-web/src/bundle';
import { platformBrowser }    from '@angular/platform-browser';
import {ModuleNgFactory} from '../../../build/aot/test/angular-webpack/angular/module.ngfactory';

platformBrowser().bootstrapModuleFactory(ModuleNgFactory);



