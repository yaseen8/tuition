import { Injectable } from '@angular/core';
import {ApiService} from "../api.service";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PromotionsService {

  constructor(protected apiService: ApiService,
              private http: HttpClient) { }
  getPromotions(){
    return this.http.get(this.apiService.getRoute('promotions_for_user'));
  }
}
