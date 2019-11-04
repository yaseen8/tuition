import { Injectable } from '@angular/core';
import {ApiService} from "../api.service";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(private apiService: ApiService,
              private http: HttpClient) { }

  getSubjectsList(id) {
   return this.http.get(this.apiService.getRoute('course/get_by_study_level/' + id));
  }
}
