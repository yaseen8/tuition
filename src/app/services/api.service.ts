import { Injectable } from '@angular/core';
import {ConfigService} from "./config/config.service";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private apiConf: ConfigService) { }
    getRoute(p: string, q?: any) {
        return this.apiConf.prepRoute(p, q);
    }

    getMediaUrl(p: string) {
        return this.apiConf.prepMediaUrl(p);
    }
}
