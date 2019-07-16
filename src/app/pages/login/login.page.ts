import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";
import {TokenService} from "../../services/auth/token.service";
import {NavController} from "@ionic/angular";
import { ToastService } from '../../services/toast/toast.service';
import { LoaderService } from '../../services/loader/loader.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  courseId : number;

  fg = new FormGroup({
    username : new FormControl('', [
      Validators.required
    ]),
    password : new FormControl('', [
      Validators.required
    ])
  })

  constructor(private authService : AuthService,
              private tokenService : TokenService,
              private navCtrl : NavController,
              private toastService : ToastService,
              private loaderService : LoaderService,
              private activatedRoute : ActivatedRoute) {
                this.activatedRoute.params.subscribe(
                  (resp) => {
                    if(resp) {
                      this.courseId = resp['courseId'];
                    }
                  }
                )
               }

  ngOnInit() {
  }

  login() {
    this.loaderService.presentLoading();
    this.authService.login(this.fg.value)
        .subscribe(
            (resp) => {
                this.tokenService.setToken(resp['token']);
                this.loaderService.dismissLoading();
                this.toastService.presentToast('Login Successfull');
                if(!this.courseId) {
                this.navCtrl.navigateForward('home');                  
                }
                else {
                  this.navCtrl.navigateForward('course-detail/' + this.courseId);
                }

            },
            (error) => {
              this.loaderService.dismissLoading();
              this.toastService.presentToast('Username or password is incorrect');
            }
        )
  }

  goToRegister() {
    if(!this.courseId) {
    this.navCtrl.navigateForward('register');
    }
    else {
    this.navCtrl.navigateForward('register/' + this.courseId);
    }
  }

  hasError(control: string, errorName: string) {
    return this.fg.get(control).hasError(errorName);
  }

}
