import { Component, OnInit } from '@angular/core';
import {ChatService} from "../../../services/chat/chat.service";
import {NavController} from "@ionic/angular";
import {AuthService} from "../../../services/auth/auth.service";

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.page.html',
  styleUrls: ['./chat-list.page.scss'],
})
export class ChatListPage implements OnInit {
  chatList: any = [];
  userType: string;
  showData: boolean;
  constructor(private chatService: ChatService,
              private navCtrl: NavController,
              private authService: AuthService) {
              this.showData = true;
              this.authService.checkLoggedIn().subscribe(
                  (resp: any) => {
                    this.userType = resp.user_type;
                    if(resp.user_type === 'student') {
                      this.getStudentChatList();
                    } else if (resp.user_type === 'teacher') {
                      this.getTeacherChatList();
                    }
                  }
              )
  }

  ngOnInit() {
  }
  getTeacherChatList() {
    this.chatService.getTeacherChatList().subscribe(
        (resp) => {
          this.chatList = resp;
        }
    )
  }
  getStudentChatList() {
    this.chatService.getStudentChatList().subscribe(
        (resp) => {
          this.chatList = resp;
          if(this.chatList.length) {
              this.showData = true
          }
          else {
              this.showData = false;
          }
        },
        (error) => {
            this.showData = false;
        }
    )
  }
  chat(id) {
    this.navCtrl.navigateForward('chat/' + id);
  }

}
