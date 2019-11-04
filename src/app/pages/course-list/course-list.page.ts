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
  studyLevelId : number;
  courseId : number;
  startDate : string;
  showData : boolean = true;
  userLoggedIn : boolean = false;
  userData: any = {};
  userType: string;

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
                      this.authService.checkLoggedIn().subscribe(
                          (resp) => {
                              this.userData = resp;
                              this.userType = this.userData.user_type;
                          },
                          (error) => {
                              this.userData = {};
                          }
                      );
                  }
                }
              );
              
               }

  ngOnInit() {
    this.getCoursesList();
    
  }

    async presentModal() {
        const modal = await this.modalController.create({
            component: CourseFilterModalPage,
        });
        modal.onDidDismiss().then(
          (resp) => {
            if(resp['data']['study_level'] || resp['data']['course_id'] || resp['data']['start_date']){
              this.studyLevelId = resp['data']['study_level'];
              this.courseId = resp['data']['course_id'];
              this.startDate = resp['data']['start_date'];
            }
            this.getCoursesList();
          }
        )

        return await modal.present();
      
    }

    getCoursesList() {
      this.courseList = [];
      let date = this.getCurrentDate();
      this.loaderService.presentLoading();
      this.coursesService.getCourses(this.status,this.studyLevelId, this.courseId, this.startDate)
      .subscribe(
        (resp : any) => {
          if(resp.length) {
          for(let c of resp) {
            if(c.start_date > date) {
              this.courseList.push(c);
            }
          }
       
          if(this.courseList.length) {
            this.showData = true;
          }
          else{
            this.showData = false;
          }
        }
        else {
          this.showData = false;
        }
        this.loaderService.dismissLoading();
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

    getCurrentDate() {
      let date = new Date();
      let mm : any;
      let dd : any;
      dd = date.getDate();
      if(dd < 9) {
        dd = '0' + dd;
      }
      mm = date.getMonth() + 1;
      if(mm <= 9) {
        mm = '0' + mm;
      }
      let yyyy = date.getFullYear();
      return yyyy + '-' + mm + '-' + dd;
    }

    courseDetail(id) {
      this.navCtrl.navigateForward('course-detail/' + id);
    }
    chat(teacherId) {
      this.navCtrl.navigateForward('chat/' + teacherId);
    }

}
