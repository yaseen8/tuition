import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";
import {TokenService} from "../../services/auth/token.service";
import {NavController} from "@ionic/angular";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username : string;
  password : string;

  constructor(private authService : AuthService,
              private tokenService : TokenService,
              private navCtrl : NavController) { }

  ngOnInit() {
  }

  login() {
    const data = {
      'username' : this.username,
        'password' : this.password
    }
    this.authService.login(data)
        .subscribe(
            (resp) => {
                this.tokenService.setToken(resp['token']);
                this.navCtrl.navigateForward('home');
              console.log(resp);

            },
            (error) => {
              console.log(error);
            }
        )
  }

}
