import { Component } from '@angular/core';
import {MenuController, NavController, Platform} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { TokenService } from './services/auth/token.service';
import { AuthService } from './services/auth/auth.service';
import { Storage } from '@ionic/storage';
import { ToastService } from './services/toast/toast.service';
import { LoaderService } from './services/loader/loader.service';
import { FCM } from '@ionic-native/fcm/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  userLogin : boolean = false;
  userData: any = {};
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home',
      hideItem : false
    },
    {
      title: 'Browse Courses',
      url: '/course-list',
      icon: 'list',
      hideItem : false

    },
    {
      title: 'My Courses',
      url: '/booking-history',
      icon: 'timer',
      hideItem : true
    },
    {
      title: 'Chat',
      url: '/chat-list',
      icon: 'chatboxes',
      hideItem : true
    },
    {
      title: 'Payment History',
      url: '/payment-history',
      icon: 'cash',
      hideItem : true
    },
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
    private toastService : ToastService,
    private loaderService : LoaderService,
    private fcm: FCM,
  ) {

    this.initializeApp();
    this.authService.loginStatusChange.subscribe(
      (resp) => {
        if(resp) {
          this.userLogin = true;
          this.appPages[2].hideItem = false;
          this.appPages[3].hideItem = false;
            this.appPages[4].hideItem = false;
          this.authService.checkLoggedIn().subscribe(
              (resp) => {
                this.userData = resp;
                this.userNotification();
              },
              (error) => {
                this.userData = {};
              }
          );
        }
        else{
          this.userLogin = false;
          this.appPages[2].hideItem = true;
          this.appPages[3].hideItem = true;
            this.appPages[4].hideItem = true;
        }
      }
    );

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.generalNotification();
    });
  }

    goToLogin() {
    this.menuCtrl.close();
    this.navCtrl.navigateForward('login')
    }

    logout() {
      this.loaderService.presentLoading();
      this.authService.logout()
      .subscribe(
        (resp) => {
          this.authService.clearAuthorized();
          this.loaderService.dismissLoading();
          this.toastService.presentToast('Logout Successfull');
          this.menuCtrl.close();
          this.navCtrl.navigateForward('home');
        },
        (error) => {
          this.loaderService.dismissLoading();
        }
      )
    }
  generalNotification() {
    let notification : any;
    this.fcm.getToken();
    this.fcm.subscribeToTopic('promotions');
    this.fcm.subscribeToTopic('course');
    this.fcm.onNotification().subscribe(data => {
      notification = JSON.stringify(data);
      if(data.wasTapped){
        // alert("Received in background");
        // if(data.type == 'jobs') {
        //   this.navCtrl.navigateForward('new-jobs');
        // }
        // else if (data.type == 'message') {
        //   this.navCtrl.navigateForward('messages');
        // }
      } else {
        alert(data.body);
        // if (data.type == 'jobs') {
        //   this.navCtrl.navigateForward('new-jobs');
        // } else if (data.type == 'message') {
        //
        //   // this.showAlert(notification.title, notification.body);
        //
        // }
        ;
      }
    });

    // this.fcm.onTokenRefresh();
  }
  userNotification() {
    let notification : any;
    let id = this.userData.id.toString();
    this.fcm.getToken();
    this.fcm.subscribeToTopic(id);
    this.fcm.onNotification().subscribe(data => {
      notification = JSON.stringify(data);
      if(data.wasTapped){
        // alert("Received in background");
        // if(data.type == 'jobs') {
        //   this.navCtrl.navigateForward('new-jobs');
        // }
        // else if (data.type == 'message') {
        //   this.navCtrl.navigateForward('messages');
        // }
      } else {
        alert(data.body);
        // if (data.type == 'jobs') {
        //   this.navCtrl.navigateForward('new-jobs');
        // } else if (data.type == 'message') {
        //
        //   // this.showAlert(notification.title, notification.body);
        //
        // }
        ;
      }
    });

    // this.fcm.onTokenRefresh();
  }
}
