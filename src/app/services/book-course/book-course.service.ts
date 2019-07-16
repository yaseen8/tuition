import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';
// import { File } from '@ionic-native/file';

@Injectable({
  providedIn: 'root'
})
export class BookCourseService {

  constructor(private apiService : ApiService,
    private http : HttpClient) { }

  bookCourse(data) {
   return this.http.post(this.apiService.getRoute('book_course'), data);
  }

  getUserBooking(status) {
    return this.http.get(this.apiService.getRoute('get_user_booking', {'status' : status}))
  }

  getUserPayments(status) {
    return this.http.get(this.apiService.getRoute('get_user_payments', {'status' : status}))    
  }
}
