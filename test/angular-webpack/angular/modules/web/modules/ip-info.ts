import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class IpInfoService {

    constructor(private http: HttpClient) {
    }

    public get get() {
        const response = this.http.get('https://server.patrikx3.com/api/patrikx3/ipinfo/get').toPromise();
        return response;
    }

}
