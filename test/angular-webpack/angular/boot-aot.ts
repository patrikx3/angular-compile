import 'corifeus-web/src/bundle';

import { enableProdMode } from '@angular/core';

import { platformBrowser }    from '@angular/platform-browser';
import {ModuleNgFactory} from './module.ngfactory';

enableProdMode();
platformBrowser().bootstrapModuleFactory(ModuleNgFactory);



