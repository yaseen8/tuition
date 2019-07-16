import { Component, OnInit } from '@angular/core';
import {ModalController, NavController} from "@ionic/angular";
import {CourseFilterModalPage} from "../../modal/course-filter-modal/course-filter-modal.page";
import { CoursesService } from '../../services/courses/courses.service';
import { BookCourseService } from '../../services/book-course/book-course.service';
import { ToastService } from '../../services/toast/toast.service';
import { LoaderService } from '../../services/loader/loader.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.page.html',
  styleUrls: ['./course-list.page.scss'],
})
export class CourseListPage implements OnInit {

  courseList : any = [];
  status : string;
  courseId : number;
  startDate : string;
  showData : boolean = true;
  userLoggedIn : boolean = false;

  constructor(private modalController : ModalController,
              private navCtrl : NavController,
              private coursesService : CoursesService,
              private bookCourseSevice : BookCourseService,
              private toastService : ToastService,
              private loaderService : LoaderService,
              private activatedRoute : ActivatedRoute,
              private authService : AuthService) {
                this.status = 'new';
              this.activatedRoute.params.subscribe(
                (resp) => {
                  if(resp) {
                    this.courseId = resp['id'];
                  }
                }
              )
              
               }

  ngOnInit() {
    this.checkLogin();
    this.getCoursesList();
    
  }

  checkLogin() {
    this.authService.checkLoggedIn()
    .subscribe(
      (resp) => {
        console.log(resp);
        this.userLoggedIn = true;
      },
      (error) => {
        this.userLoggedIn = false;
      }
    )
  }

    async presentModal() {
        const modal = await this.modalController.create({
            component: CourseFilterModalPage,
        });
        modal.onDidDismiss().then(
          (resp) => {
            if(resp['data']['course_id'] || resp['data']['start_date']){
              this.courseId = resp['data']['course_id'];
              this.startDate = resp['data']['start_date'];
            }
            this.getCoursesList();
          }
        )

        return await modal.present();
      
    }

    getCoursesList() {
      this.loaderService.presentLoading();
      this.coursesService.getCourses(this.status, this.courseId, this.startDate)
      .subscribe(
        (resp) => {
          this.courseList = resp;
          this.loaderService.dismissLoading();
          if(this.courseList.length) {
            this.showData = true;
          }
          else{
            this.showData = false;
          }
        },
        (error) => {
          this.loaderService.dismissLoading();
        }
      )
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
        },
        (error) => {
          this.loaderService.dismissLoading();
          this.toastService.presentToast('Something went wrong, please try later');
        }
      )
    }
    else {
      this.toastService.presentToast('Please Login to book course');
    }
    }

    courseDetail(id) {
      this.navCtrl.navigateForward('course-detail/' + id);
    }

}
