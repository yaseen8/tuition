import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { ToastService } from '../../services/toast/toast.service';
import { LoaderService } from '../../services/loader/loader.service';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { strongPasswordValidator } from '../../validators/strong-password-validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  userNameExist : boolean = false;
  emailExist : boolean = false;
  courseId : number;

  fg = new FormGroup({
    name : new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z]+')
    ]),
    username: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z0-9-_]+'),
  ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email
  ]),
  phone: new FormControl('', [
    Validators.pattern('[0-9]+'),
  ]),
  password: new FormControl('', [
    Validators.required,
    Validators.minLength(8),
    strongPasswordValidator()]),
  password_confirmation: new FormControl('', [
    Validators.required,
    Validators.minLength(8),
    strongPasswordValidator()])
    }, this.checkPassMatch.bind(this))

  constructor(private userService : UserService,
              private toastService : ToastService,
              private loaderService : LoaderService,
              private activatedRoute : ActivatedRoute,
              private navCtrl : NavController) { 
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

  checkUsername() {
    this.userService.checkUsername(this.fg.get('username').value)
    .subscribe(
      (resp : any) => {
        if(resp.length) {
          this.userNameExist = true;
        }
        else {
          this.userNameExist = false;
        }  
      })
  }

  checkEmail() {
    this.userService.checkEmail(this.fg.get('email').value)
    .subscribe(
      (resp : any) => {
        if(resp.length) {
          this.emailExist = true;
        }
        else {
          this.emailExist = false;
        }  
      })
  }
  

  checkPassMatch(g: FormGroup) {
    if (g.get('password').value !== g.get('password_confirmation').value) {
        g.get('password_confirmation').setErrors({ passwordMisMatch: true });
    }
    return null;
}

hasError(control: string, errorName: string) {
  return this.fg.get(control).hasError(errorName);
}

  register() {
    if(!this.userNameExist && !this.emailExist)
    {
    this.loaderService.presentLoading();
    this.userService.regiter(this.fg.value)
    .subscribe(
      (resp) => {
        this.loaderService.dismissLoading();
        this.toastService.presentToast('User created successfully');
        if(!this.courseId) {
          this.navCtrl.navigateForward('login');
        }
        else{
          this.navCtrl.navigateForward('login/' + this.courseId);
        }
      },
      (error) => {
        this.loaderService.dismissLoading();
        this.toastService.presentToast('Something went wrong, Try again');
      }
    )
  }
}

  goToLogin() {
    if(!this.courseId) {
      this.navCtrl.navigateForward('login');
    }
    else {
      this.navCtrl.navigateForward('login/' + this.courseId);
    }
  }

}
