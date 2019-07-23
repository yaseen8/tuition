import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private apiService : ApiService,
              private http : HttpClient) { }

  getCourses(status,studyLevelId, courseId, startDate) {
  return this.http.get(this.apiService.getRoute('course_list', {'status' : status,'study_level' : studyLevelId, 'course_id' : courseId, 'start_date' : startDate}));
  }

  getCourseDetail(id) {
    return this.http.get(this.apiService.getRoute('get_course_detail/' + id))
  }
}
