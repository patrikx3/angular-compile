import {
    Injectable
} from '@angular/core';

import {
    HttpEvent,
    HttpInterceptor,
    HttpHeaders,
    HttpHandler,
    HttpRequest,
} from '@angular/common/http';


import {Observable} from 'rxjs';
//import 'rxjs/add/observable/throw'
import {tap} from 'rxjs/operators';

//import 'rxjs/add/operator/finally';

import {
    HttpShareService,
} from './http-share';

import {State} from './state';

import {CookieService} from '../cookie';

import {SettingsService} from '../settings';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    cookie: CookieService = new CookieService();
    settings: SettingsService = new SettingsService();
    httpShare: HttpShareService = new HttpShareService()

    constructor() {
    }

    private handleFinally(url: string) {
        if (window.corifeus.core.http.counterUrlMap[url] === 1) {
            delete window.corifeus.core.http.counterUrlMap[url];
        } else {
            window.corifeus.core.http.counterUrlMap[url]--;
        }
        window.corifeus.core.http.counter--
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        window.corifeus.core.http.counter++;

        let interceptedRequest = req;
        const url: any = req.url;

        if (window.corifeus.core.http.counterUrlMap.hasOwnProperty(url)) {
            window.corifeus.core.http.counterUrlMap[url]++;
        } else {
            window.corifeus.core.http.counterUrlMap[url] = 1;
        }

        State.NotFound = false;
        window.corifeus.core.http.status = 200;

        if (this.settings.data.core.server.url !== undefined && this.settings.data.core.server.url !== null && this.settings.data.core.server.url !== '') {
            if (url.startsWith(this.settings.data.core.server.url) && !url.startsWith(`${this.settings.data.core.server.url}/api/core/auth/login`)) {
                let headers = new HttpHeaders();

                if (this.httpShare.token !== '') {
                    headers = new HttpHeaders({
                        [this.settings.data.core.header.token]: `${this.httpShare.token}`,
                    });
                }

                interceptedRequest = req.clone({
                    headers: headers
                });
            }
        }
        return next.handle(interceptedRequest).pipe(
            tap(
                (event: any) => {
                    if (event.type !== 0) {
                        this.handleFinally(url);
                    }
                }, (err: any) => {
                    this.handleFinally(url);
                }
            ),
        )


        /*
        handle.do((event: any) => {
//            const eventType : string = typeof event;
            if (event.type !== 0) {
                this.handleFinally(url);
            }
        }, (err: any) => {
            this.handleFinally(url);
        });
        */

//        return handle;
    }
}

/*
import { Injectable } from '@angular/core';

import {
    Http,
    ConnectionBackend,
    RequestOptions,
    RequestOptionsArgs,
    Request,
    Response,
    Headers
} from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';

import { State } from './state';

import { CookieService  } from '../cookie';

import { SettingsService } from '../settings';

import { HttpShareService } from './http-share';


let share : HttpShareService;


@Injectable()
export class HttpInterceptor extends Http
{

    cookie: CookieService = new CookieService();
    settings: SettingsService = new SettingsService();

    constructor(
        backend: ConnectionBackend,
        defaultOptions: RequestOptions,
    ) {
        super(backend, defaultOptions);
        if (share === undefined) {
            share = new HttpShareService();
        }
    }

    /*

    private handleError(err: Response, caught: Observable<{}>) {
        window.corifeus.core.http.counter--;
        State.NotFound = true;
        window.corifeus.core.http.status = 404;
    }
     */

/*

    private handleFinally(urlString: string) {
        if (window.corifeus.core.http.counterUrlMap[urlString] === 1) {
             delete window.corifeus.core.http.counterUrlMap[urlString];
        } else {
            window.corifeus.core.http.counterUrlMap[urlString]--;
        }
        window.corifeus.core.http.counter--
    }

    public get data() {
        return share;
    }

    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
        window.corifeus.core.http.counter++;

        const urlString = url instanceof Request ? url.url : url;

        if (window.corifeus.core.http.counterUrlMap.hasOwnProperty(urlString)) {
            window.corifeus.core.http.counterUrlMap[urlString]++;
        } else {
            window.corifeus.core.http.counterUrlMap[urlString] = 1;
        }

        State.NotFound = false;
        window.corifeus.core.http.status = 200;
        if (this.settings.data.core.server.url !== undefined && this.settings.data.core.server.url !== null && this.settings.data.core.server.url !== '') {
            if (url instanceof Request) {
                if (url.url.startsWith(this.settings.data.core.server.url)) {
                    url.headers = url.headers || new Headers();
                    url.headers.set(this.settings.data.core.header.token, share.token)
                    url.headers.set(this.settings.data.core.header.tokenAuto, share.tokenAuto)
                }
            } else {
                if (url.startsWith(this.settings.data.core.server.url)) {
                    options.headers = options.headers || new Headers();
                    options.headers.set(this.settings.data.core.header.token, share.token)
                    options.headers.set(this.settings.data.core.header.tokenAuto, share.tokenAuto)
                }
            }
        }

        const response = super.request(url, options);

        response.subscribe(
            (response: Response) => {
                try {
                    if (response.headers.has(this.settings.data.core.header.token)) {
                        share.token = response.headers.get(this.settings.data.core.header.token);
                    }
                    if (response.headers.has(this.settings.data.core.header.tokenAuto)) {
                        share.tokenAuto = response.headers.get(this.settings.data.core.header.tokenAuto);
                    }
                } catch (e) {
                    window.corifeus.core.http.error.push(e);
                    console.error(e);
                }
            },
            (e: any) => {
                this.handleFinally(urlString);
                window.corifeus.core.http.error.push(e);
            },
            () => {
                this.handleFinally(urlString)
            }
        );

        return response;
    }
}
*/
