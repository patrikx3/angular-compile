import {
    Injectable,
    NgZone,
    OnDestroy,
} from '@angular/core';

import {Observable, BehaviorSubject} from 'rxjs';

import {log as defaultLog} from '../util/log';

const log = defaultLog.factory('media query');

export enum MediaQuerySettingType {
    Width
}

let mediaQuerySettingId = 0
export interface MediaQuerySetting {
    name: string,
    min: number,
    max: number,
    type: MediaQuerySettingType,
    _id: number,
}

@Injectable()
export class MediaQueryService implements OnDestroy {

    settings: MediaQuerySetting[] = [];

    lastResult: MediaQuerySetting[] = [];

    width: number;
    height: number;

    subject: BehaviorSubject<MediaQuerySetting[]>;

    onResize: EventListener;

    debounce: any;

    constructor(
        private ngZone: NgZone
    ) {
        this.subject = new BehaviorSubject(<MediaQuerySetting[]>[]);


        this.register([
            <MediaQuerySetting>{
                name: 'small',
                min: 0,
                max: 599,
                type: MediaQuerySettingType.Width
            },
            <MediaQuerySetting>{
                name: 'large',
                min: 600,
                max: Infinity,
                type: MediaQuerySettingType.Width
            }
        ])

        const debounceTime = 500;
        this.onResize = (evt: Event) => {
            clearTimeout(this.debounce);

            this.debounce = setTimeout(() => {
//                console.log('debounced')
                this.ngZone.run(() => {
                    this.width = window.innerWidth;
                    this.height = window.innerHeight;
                    this.findMediaQuery()
                });
            }, debounceTime)
        }

        this.debounce = setTimeout(() => {
            this.onResize(null);
        }, debounceTime)

        window.addEventListener('resize', this.onResize)

    }

    public register(settings: MediaQuerySetting[]) {
        const unregisterIds : Array<number> = []
        for (let setting of settings) {
            let found = false;
            for (let useSetting of this.settings) {
                if (useSetting.name === setting.name && useSetting.type === setting.type) {
                    found = true;
                    console.warn(`corifeus-web media-query service has duplicate settings`)
                    break;
                }
            }
            if (found === false) {
                mediaQuerySettingId++
                unregisterIds.push(mediaQuerySettingId)
                setting._id = mediaQuerySettingId
                this.settings.push(setting);
            }

        }
        this.findMediaQuery();

        const self = this
        return ((unregisterIds: Array<number>) => {
            return function() {

                const newSettings : MediaQuerySetting[] = []

                for(let setting of self.settings) {
                    let keep = true
                    for(let unregisterId of unregisterIds) {
                        if (setting._id === unregisterId) {
                            keep = false
                            break;
                        }
                    }
                    if (keep) {
                        newSettings.push(setting)
                    }
                }
                self.settings = newSettings

            }
        })(unregisterIds);
    }

    private findMediaQuery() {
        let results: MediaQuerySetting[] = [];
        this.settings.forEach((setting) => {
//            console.log(setting)
            switch (setting.type) {
                case MediaQuerySettingType.Width:
                    // console.log('---------------------------');
                    const minFound = this.width >= setting.min;
                    const maxFound = this.width <= setting.max;
                    //console.log(setting.min, this.width, setting.max);
                    //console.log(minFound, this.width, maxFound);
                    if (minFound && maxFound) {
                        results.push(setting);
                    }
                    break;
            }
        })

        if (JSON.stringify(results) !== JSON.stringify(this.lastResult)) {
            this.lastResult = results;
            if (this.subject !== undefined) {
                this.subject.next(results);
            }
        }
    }

    public subscribe(subscriber: any) {
        return this.subject.subscribe({
            next: subscriber
        });
    }

    ngOnDestroy() {
        window.removeEventListener('resize', this.onResize)
        clearTimeout(this.debounce);
    }

}
