import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from '../../services/courses/courses.service';
import { LoaderService } from '../../services/loader/loader.service';
import { ToastService } from '../../services/toast/toast.service';
import { BookCourseService } from '../../services/book-course/book-course.service';
import { AuthService } from '../../services/auth/auth.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.page.html',
  styleUrls: ['./course-detail.page.scss'],
})
export class CourseDetailPage implements OnInit {
  courseDetail = {};
  showData : boolean = false;
  userLoggedIn : boolean = false;
  alreadyBookedCourse : boolean = false;

  constructor(private activatedRoute : ActivatedRoute,
              private courseService : CoursesService,
              private loaderService : LoaderService,
              private toastService : ToastService,
              private bookCourseSevice : BookCourseService,
              private authService : AuthService,
              private navCtrl : NavController) {
    this.activatedRoute.params.subscribe(
      (resp) => {
        this.checkLogin();
        this.getCourseDetail(resp['id']);
        this.checkUserBookedCourse(resp['id']);
      }
    )
   }

  ngOnInit() {
   
  }

  

  getCourseDetail(id) {
    this.courseService.getCourseDetail(id)
    .subscribe(
      (resp) => {
        this.courseDetail = resp;
        this.showData = true;
      }
    )
  }

  checkLogin() {
    this.authService.checkLoggedIn()
    .subscribe(
      (resp) => {
        this.userLoggedIn = true;
      },
      (error) => {
        this.userLoggedIn = false;
      }
    )
  }

  checkAlreadyBookedOrDate(courseStartDate) {
   if(!this.alreadyBookedCourse)    //  if user not already booked course
   {
    let currentDate = this.getDateFormat(new Date());
    if(currentDate < courseStartDate){
       return true;
    }
    else {
     return false;
    } 
   }
   else {
     return false;
   }
   
  }

  checkUserBookedCourse(courseId) {
    this.bookCourseSevice.checkUserBookedCourse(courseId)
    .subscribe(
      (resp) => {
        if(resp) {
          this.alreadyBookedCourse = true;
        }
        else {
          this.alreadyBookedCourse = false;
        }
      },
      (error) => {
      }
    )
  }

  getDateFormat(date) {
      let dd = date.getDate();
      let mm = date.getMonth()+1; 
      let yyyy = date.getFullYear();
      if(dd < 10) {
        dd = '0' + dd;
      }
      if(mm < 10) {
        mm = '0' + mm;
      }
      return yyyy + '-' + mm + '-' + dd;
  }

  bookCourse(courseId) {
    if(this.userLoggedIn) 
    {
    this.loaderService.presentLoading();
    let data = {
      'fk_new_course_id' : courseId,
      'status' : 'pending'
    }
    this.bookCourseSevice.bookCourse(data)
    .subscribe(
      (resp) => {
        this.loaderService.dismissLoading();
        this.toastService.presentToast('Successfully Booked, Please upload payment image');
        this.navCtrl.navigateForward('booking-history/new')
      },
      (error) => {
        this.loaderService.dismissLoading();
        this.toastService.presentToast('Something went wrong, please try later');
      }
    )
  }
  else {
    this.toastService.presentToast('Please Login to book course');
    this.navCtrl.navigateForward('register/' + courseId);
  }
  }

}
