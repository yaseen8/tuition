import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../services/loader/loader.service';
import { BookCourseService } from '../../services/book-course/book-course.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payment-status',
  templateUrl: './payment-status.component.html',
  styleUrls: ['./payment-status.component.scss'],
})
export class PaymentStatusComponent implements OnInit {
  status : string;
  userPayments = [];
  showData : boolean = true;

  constructor(private loaderService : LoaderService,
              private bookCourseService : BookCourseService,
              private activatedRoute : ActivatedRoute) {
                this.activatedRoute.url.subscribe(
                  (resp) => {
                    console.log(resp[0]['path']);
                    this.status =resp[0]['path'];
                    if(this.status){
                  this.getUserPayments();
                    }
                  }
                )
               }

  ngOnInit() {
    
  }

  getUserPayments() {
    this.loaderService.presentLoading();
    this.bookCourseService.getUserPayments(this.status)
    .subscribe(
      (resp : any) => {
        this.loaderService.dismissLoading();
        this.userPayments = resp;
        if(this.userPayments.length) {
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

}
