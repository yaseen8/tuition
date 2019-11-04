import { Injectable } from '@angular/core';
import {ApiService} from "../api.service";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private apiService : ApiService,
              private http : HttpClient) { }

  getChat(chat_from,chat_to, user_type) {
    return this.http.get(this.apiService.getRoute('get_chats', {'chat_from' :chat_from, 'chat_to' : chat_to, 'user_type' : user_type}));
  }

  addUserMessage(data) {
    return this.http.post(this.apiService.getRoute('add_user_message'), data);
  }
  getTeacherChatList() {
    return this.http.get(this.apiService.getRoute('get_teacher_chat_list'));
  }
  getStudentChatList() {
        return this.http.get(this.apiService.getRoute('get_student_chat_list'));
    }
}
