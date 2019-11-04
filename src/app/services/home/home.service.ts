import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiService} from "../api.service";

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient,
              private apiService: ApiService) { }
  getHomeContent() {
    return this.http.get(this.apiService.getRoute('home_content'));
  }
}
