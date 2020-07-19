import {
    Injectable
} from '@angular/core';

//import * as Cookies from 'js-cookie';

import * as cookie from 'js-cookie';

@Injectable()
export class CookieService {

    public get(name: string): string {
        return cookie.get(name);
    }

    public set(name: string, value: string | any, options?: Cookies.CookieAttributes): void {
        cookie.set(name, value, options)
    }

    public getAll(): { [key: string]: string } {
        return cookie.get();
    }

}
