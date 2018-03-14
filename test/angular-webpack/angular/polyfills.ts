//import 'corifeus-web/src/polyfills';

import 'core-js/es6';
import 'core-js/es7/reflect.js';
import 'zone.js/dist/zone.js';

if (process.env.ENV === 'production') {
    // Production
} else {
    // Development
    Error['stackTraceLimit'] = Infinity;
    require('zone.js/dist/long-stack-trace-zone');
}

