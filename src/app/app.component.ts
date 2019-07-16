import { Component } from '@angular/core';

import {MenuController, NavController, Platform} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { TokenService } from './services/auth/token.service';
import { AuthService } from './services/auth/auth.service';
import { Storage } from '@ionic/storage';
import { ToastService } from './services/toast/toast.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  userLogin : boolean = false;
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home',
      hideItem : false
    },
    {
      title: 'Course List',
      url: '/course-list',
      icon: 'list',
      hideItem : false

    },
    {
      title: 'Booking History',
      url: '/booking-history',
      icon: 'timer',
      hideItem : true
    },
    {
      title: 'Payment History',
      url: '/payment-history',
      icon: 'timer',
      hideItem : true
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private navCtrl : NavController,
    private menuCtrl : MenuController,
    private tokenService : TokenService,
    private authService : AuthService,
    private storage : Storage,
    private toastService : ToastService
  ) {

    this.initializeApp();
    this.authService.loginStatusChange.subscribe(
      (resp) => {
        if(resp) {
          this.userLogin = true;
          this.appPages[2].hideItem = false;
          this.appPages[3].hideItem = false;

        }
        else{
          this.userLogin = false;
          this.appPages[2].hideItem = true;
          this.appPages[3].hideItem = true;
        }
      }
    )
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

    goToLogin() {
    this.menuCtrl.close();
    this.navCtrl.navigateForward('login')
    }

    logout() {
      this.authService.logout()
      .subscribe(
        (resp) => {
          this.authService.clearAuthorized();
          this.menuCtrl.close();
          this.navCtrl.navigateForward('home');
          this.toastService.presentToast('Logout Successfull');
        }
      )
    }
}
