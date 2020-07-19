import {
    Injectable,
    OnInit,
    ElementRef
} from '@angular/core';

const tinycolor = require('tinycolor2');

const colorCalculatorCache = {}

@Injectable()
export class ColorService {

    public getReadableColor(fg: any, bg: any, step: number = 5) {
        let fgColor = tinycolor(fg);
        let bgColor = tinycolor(bg);

        const key = `${fgColor.toHexString()}${bgColor.toHexString()}`;
        if (colorCalculatorCache.hasOwnProperty(key)) {
//            console.log(key)
//            console.log(colorCalculatorCache)
            return colorCalculatorCache[key];
        }

//        console.log('----------------------------------------------------')
//        console.log(fgColor.toHexString())

        const max = Math.ceil(100 / step);
        let count = 0;
        const read = () => {
            while (!tinycolor.isReadable(fgColor, bgColor) && count < max) {
                fgColor = fgColor[method](step);
                //console.log(`${method} BG-${bgColor.toHexString()} => FG-${fgColor.toHexString()}`)
                count++;
            }
        }
        let method = 'lighten';
        read();
        if (count >= max) {
            count = 0;
            method = 'darken'
            fgColor = tinycolor(fg);
            read();
        }
        if (count >= max) {
            fgColor = tinycolor(fg);
            fgColor = tinycolor.mostReadable(bgColor, [fgColor]);
        }
//        console.log(fgColor.toHexString())
//        console.log('----------------------------------------------------')
        const result = fgColor.toHexString();
        colorCalculatorCache[key] = result;
        return result;
    }
}
