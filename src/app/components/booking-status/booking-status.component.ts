import { Component, OnInit } from '@angular/core';
import { BookCourseService } from '../../services/book-course/book-course.service';
import { LoaderService } from '../../services/loader/loader.service';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-booking-status',
  templateUrl: './booking-status.component.html',
  styleUrls: ['./booking-status.component.scss'],
})
export class BookingStatusComponent implements OnInit {
  userBooking = [];
  status : string;
  showData : boolean = true;

  constructor(private activatedRoute : ActivatedRoute,
              private bookCourseService : BookCourseService,
              private loaderService : LoaderService,
              private navCtrl : NavController) {
                this.activatedRoute.url.subscribe(
                  (resp) =>{
                    this.status = resp[0]['path'];
                    if(this.status) {
                      this.getUserBooking();
                    }
                  }
                )
   }

  ngOnInit() {}

  getUserBooking() {
    this.loaderService.presentLoading();
   this.bookCourseService.getUserBooking(this.status)
    .subscribe(
      (resp : any) => {
        this.userBooking = resp;
        this.loaderService.dismissLoading();
        if(this.userBooking.length) {
          this.showData = true;
        }
        else {
          this.showData = false;
        }
      },
      (error) => {
        this.loaderService.dismissLoading();
      }
    )
  }

  courseDetail(id) {
    this.navCtrl.navigateForward('course-detail/' + id);
  }

}
