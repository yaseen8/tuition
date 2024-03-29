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
  courseDetail : any;
  showData : boolean = false;
  userLoggedIn : boolean = false;
  alreadyBookedCourse : boolean = false;
  courseDescription : string;
  teacherDescription : string;
  userType: string;

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
    this.loaderService.presentLoading();
    this.courseService.getCourseDetail(id)
    .subscribe(
      (resp) => {
        this.courseDetail = resp;
        this.courseDescription = resp['description'];
        this.teacherDescription = resp['teacher_detail']['description'];
        this.showData = true;
        this.loaderService.dismissLoading();
      },
      (error) => {
        this.loaderService.dismissLoading();
      }
    )
  }

  checkLogin() {
    this.authService.checkLoggedIn()
    .subscribe(
      (resp: any) => {
        this.userLoggedIn = true;
        this.userType = resp.user_type;
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
      this.navCtrl.navigateForward('booking-confirmation/' + courseId);
  }
  else {
    this.toastService.presentToast('Please Login to book course');
    this.navCtrl.navigateForward('register/' + courseId);
  }
  }
  chat(teacherId) {
      this.navCtrl.navigateForward('chat/' + teacherId);
  }
}
