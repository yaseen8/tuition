import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ConfigService {
    private webRoot: string = 'http://www.mocky.io/v2/';
    private meidaServer: string = 'https://storage.googleapis.com/ainilm-com-bucket/';

  constructor() { }
    prepRoute(path: string, q?: any) {
        let query = '';
        if (q) {
            query = '?';
            let c = 0;
            for (let key in q) {
                if (c > 0) {
                    query += '&';
                }
                if (q[key]) {
                    query += key + '=' + q[key];
                }
                c++;
            }
        }

        return this.webRoot + path + query;
    }

    prepMediaUrl(media) {
        return this.meidaServer + media;
    }
}
