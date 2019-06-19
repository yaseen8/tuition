import { Injectable } from '@angular/core';
import {ApiService} from "../api.service";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(private apiService: ApiService,
              private http: HttpClient) { }

  getSubjectsList() {
   return this.http.get(this.apiService.getRoute('5d07ce2e34000059005d9500'));
  }
}
