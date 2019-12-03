import { Component, OnInit } from '@angular/core';
import {LoaderService} from "../../services/loader/loader.service";
import {ChatService} from "../../services/chat/chat.service";
import {AuthService} from "../../services/auth/auth.service";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../services/user/user.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  chatList : any = [];
  showData : boolean = true;
  userData : any = {};
  messageBody : string;
  userId: number;
  userDetail: any = {};

  constructor(private loaderService : LoaderService,
              private chatService : ChatService,
              private authService : AuthService,
              private activatedRoute: ActivatedRoute,
              private userService: UserService) {
              this.activatedRoute.params.subscribe(
                  (resp) => {
                      if(resp) {
                          this.userId = resp['userId'];
                          this.getLoggedInUser();
                      }
                  }
              );
  }


    ngOnInit() {
  }
  getLoggedInUser() {
      this.authService.checkLoggedIn().subscribe(
          (resp) => {
              this.userData = resp;
              this.getUserDetail();
              this.getChat();
          }
      )
  }
  getUserDetail() {
      this.userService.userData(this.userId).subscribe(
          (resp) => {
              this.userDetail = resp;
          }
      )
  }

  getChat() {
    this.loaderService.presentLoading();
    this.chatService.getChat(this.userData.id, this.userId, this.userData.user_type).subscribe(
        (resp) => {
          console.log(resp);
          this.chatList = resp;
          if(this.chatList && this.chatList.length) {
            this.showData = true
          }
          else {
            this.showData = false;
          }
          this.loaderService.dismissLoading();
        },
        (error) => {
          this.showData = false;
          this.loaderService.dismissLoading();
        }
    )
  }

  addMessage() {
    if(!this.messageBody) {
      return false;
    }
    let data =  {
      body : this.messageBody,
      chat_to: this.userId
    }
    this.loaderService.presentLoading();
    this.chatService.addUserMessage(data).subscribe(
        (resp) => {
          if(resp) {
            this.getChat();
            this.messageBody = '';
          }
          this.loaderService.dismissLoading();
        },
        (error) => {
          this.loaderService.dismissLoading();
        }
    )
  }

}
