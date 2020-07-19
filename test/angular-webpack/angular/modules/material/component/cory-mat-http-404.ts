import {
    Component,
    OnDestroy
} from '@angular/core';

import { Subscription } from 'rxjs'

import {State, LocaleService, LocaleSubject} from '../../web';

@Component({
    selector: 'cory-mat-http-404',
    template: `
<div style="margin-top: 20px; font-size: 6em; opacity: 0.25;">
    404
</div>
    <div style="font-size: 3em; opacity: 0.75;">
    {{ i18n.material.http['404'] }}
    </div>
    <div style="text-overflow: ellipsis; overflow: hidden;">
    {{ url }}
    </div>
`,
})
export class Http404 implements OnDestroy {

    url: string;
    i18n: any;

    letKeep404: any;
    timeout: any;

    subscriptions$: Array<Subscription> = []

    constructor(
        public locale: LocaleService
    ) {

        history.replaceState({}, State.RequestPath, State.RequestPath);

        const its404 = () => {
            State.NotFound = true;
            window.corifeus.core.http.status = 404;
        }

        let maxWait = 10000;
        let waiter = 0;
        this.letKeep404 = setInterval(() => {
            its404();
            if (window.corifeus.core.http.counter === 0) {
                waiter++;
                if (waiter > 10) {
                    clearInterval(this.letKeep404);
                }
            }
        }, 100)

        this.timeout = setTimeout(() => {
            clearInterval(this.letKeep404);
            its404();
        }, maxWait);

        this.subscriptions$.push(
            this.locale.subscribe((data: LocaleSubject) => {
                this.i18n = data.locale.data;
            })
        )

        this.url = State.RequestPath
    }

    ngOnDestroy() {
        this.subscriptions$.forEach(subs$ => subs$.unsubscribe())
        clearInterval(this.letKeep404);
        clearTimeout(this.timeout)
    }
}
