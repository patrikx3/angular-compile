//import 'core-js/es6';
import 'core-js/es7/reflect.js';
import 'zone.js';
declare var process: any;
if (process.env === 'production') {
    // Production
} else {
    // Development
    Error['stackTraceLimit'] = Infinity;
    require('zone.js/dist/long-stack-trace-zone');
}

