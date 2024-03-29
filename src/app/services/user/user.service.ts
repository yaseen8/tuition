import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private apiService : ApiService,
              private http : HttpClient) { }

  checkUsername(username) {
    return this.http.get(this.apiService.getRoute('check_username', {'username' : username}));
  }

  checkEmail(email) {
    return this.http.get(this.apiService.getRoute('check_email', {'email' : email}));
  }

  regiter(data) {
    return this.http.post(this.apiService.getRoute('create'), data);
  }
  forgotPassword(data) {
    return this.http.post(this.apiService.getRoute('users/forgot_password'), data);
  }
  userData(id) {
    return this.http.get(this.apiService.getRoute('users/user_data/' + id));
  }
}
