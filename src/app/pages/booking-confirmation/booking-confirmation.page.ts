import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../services/loader/loader.service';
import { BookCourseService } from '../../services/book-course/book-course.service';
import { ToastService } from '../../services/toast/toast.service';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-booking-confirmation',
  templateUrl: './booking-confirmation.page.html',
  styleUrls: ['./booking-confirmation.page.scss'],
})
export class BookingConfirmationPage implements OnInit {
  courseId : number;
  content  : string;

  constructor(private loaderService : LoaderService,
              private bookCourseSevice: BookCourseService,
              private toastService : ToastService,
              private navCtrl : NavController,
              private activatedRoute : ActivatedRoute) {
                this.activatedRoute.params.subscribe(
                  (resp) => {
                    if(resp) {
                      this.courseId = resp['course-id'];
                    }
                  }
                )
               }

  ngOnInit() {
    this.paymentContent();
  }

  paymentContent(){
    this.loaderService.presentLoading();
    this.bookCourseSevice.getPaymentContent()
    .subscribe(
      (resp) =>{
        this.content = resp['content'];
        this.loaderService.dismissLoading();
       
      },
      (error) => {
        this.loaderService.dismissLoading();
      }
    )
  }

  bookCourse() {
    this.loaderService.presentLoading();
    let data = {
      'fk_new_course_id' : this.courseId,
      'status' : 'pending'
    }
    this.bookCourseSevice.bookCourse(data)
    .subscribe(
      (resp) => {
        this.loaderService.dismissLoading();
        this.toastService.presentToast('Successfully Booked, Please upload payment image');
        this.navCtrl.navigateForward('payment-history/pending')
      },
      (error) => {
        this.loaderService.dismissLoading();
        this.toastService.presentToast('Something went wrong, please try later');
      }
    )
  }

}
