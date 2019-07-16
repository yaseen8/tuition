import { Component } from '@angular/core';
import {StudyLevelService} from "../../services/study-level/study-level.service";
import {SubjectService} from "../../services/subjects/subject.service";
import { NavController } from '@ionic/angular';
import { BookCourseService } from '../../services/book-course/book-course.service';
import { AuthService } from '../../services/auth/auth.service';
import { LoaderService } from '../../services/loader/loader.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  studyLevelList = [] ;
  subjectList   = [];
  course : number;
  onGoing : number;
  pending: number;
  loggedIn : boolean = false;

  constructor(private studyLevelService : StudyLevelService,
              private subjectService : SubjectService,
              private navCtrl : NavController,
              private bookCourseService : BookCourseService,
              private authService : AuthService,
              private loaderService : LoaderService) {
                  this.onGoing = 0;
                  this.pending = 0;
            this.authService.loginStatusChange.subscribe(
                (resp) => {
                    if(resp) {
                        this.loggedIn = true;
                        this.getOngoingClasses();
                        this.getPendingClasses();
                    }
                    else {
                        this.loggedIn = false;
                        this.onGoing = 0;
                        this.pending = 0; 
                    }
                },
                (error) => {
                    this.loggedIn = false;
                    this.onGoing = 0;
                    this.pending = 0;
                }
            )
              }

    ngOnInit(){
        this.getStudyLevelList();
    }

  getStudyLevelList() {
    this.studyLevelService.getStudyLevelList()
        .subscribe(
            (resp : any) => {
              this.studyLevelList = resp;
            }
        )
  }

    getSubjects(id) {
      this.loaderService.presentLoading();
        this.subjectService.getSubjectsList(id)
            .subscribe(
                (resp : any) => {
                    this.subjectList = resp;
                  this.loaderService.dismissLoading();
                },
                (error) => {
                  this.loaderService.dismissLoading();
                }
            )
    }

    getOngoingClasses() {
       this.bookCourseService.getUserBooking('in_progress')
        .subscribe(
          (resp : any) => {
            if(resp.length) {
              this.onGoing = resp.length;
            }
            else {
              this.onGoing = 0;
            }
          },
          (error) => {
            this.onGoing = 0;
          }
        )
      }

      getPendingClasses() {
        this.bookCourseService.getUserBooking('new')
         .subscribe(
           (resp : any) => {
             if(resp.length) {
               this.pending = resp.length;
             }
             else {
               this.pending = 0;
             }
           },
           (error) => {
             this.pending = 0;
           }
         )
       }

       goToBooking(status) {
           this.navCtrl.navigateForward('/booking-history/' + status);
       }
       
    getCourseList() {
        this.navCtrl.navigateForward('course-list/' + this.course)
    }
}
