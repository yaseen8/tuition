import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { ToastService } from '../../services/toast/toast.service';
import { LoaderService } from '../../services/loader/loader.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  name : string;
  username : string;
  password : string;
  email : string;
  phone : string;
  userExist : boolean = false;

  constructor(private userService : UserService,
              private toastService : ToastService,
              private loaderService : LoaderService) { }

  ngOnInit() {
  }

  checkUsername() {
    this.userService.checkUsername(this.username)
    .subscribe(
      (resp : any) => {
        if(resp.length) {
          this.userExist = true;
        }
        else {
          this.userExist = false;
        }
      }
    )
  }

  register() {
    if(this.userExist)
    {
        this.toastService.presentToast('Username already taken. Try another');
        return false;
    }
    if(!this.name) {
      this.toastService.presentToast('Name is required');
      return false;
    }
    if(!this.username){
      this.toastService.presentToast('Username id required');
      return false;
    }
    if(!this.password) {
      this.toastService.presentToast('Password is required');
    }
    
    this.loaderService.presentLoading();

    let data = {
      'name' : this.name,
      'username' : this.username,
      'password' : this.password,
      'email' : this.email,
      'phone_no' : this.phone,
      'user_type' : 'student'
    }
    this.userService.regiter(data)
    .subscribe(
      (resp) => {
        this.loaderService.dismissLoading();
        this.toastService.presentToast('User created successfully');
        this.clearFields();
      },
      (error) => {
        this.loaderService.dismissLoading();
        this.toastService.presentToast('Something went wrong, Try again');
      }
    )
  }

  clearFields() {
    this.name = '';
    this.username = '';
    this.password = '';
    this.email = '';
    this.phone = '';
  }

}
