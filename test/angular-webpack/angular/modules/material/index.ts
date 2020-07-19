export * from './component';

export * from './module';

import {log} from '../web';

export * from './services';

const logMaterial = log.factory('material');

export {logMaterial as log};

export * from './boot';

export * from './services';
