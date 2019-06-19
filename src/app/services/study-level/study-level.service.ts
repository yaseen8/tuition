import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiService} from "../api.service";


@Injectable({
  providedIn: 'root'
})
export class StudyLevelService {

  constructor(protected apiService: ApiService,
              private http: HttpClient) { }

  getStudyLevelList() {
   return this.http.get(this.apiService.getRoute('5d07c9e334000059005d94e6'));
  }
}
