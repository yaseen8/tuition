import { Component, OnInit } from '@angular/core';
import {ModalController, NavController} from "@ionic/angular";
import {CourseFilterModalPage} from "../../modal/course-filter-modal/course-filter-modal.page";

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.page.html',
  styleUrls: ['./course-list.page.scss'],
})
export class CourseListPage implements OnInit {

  constructor(private modalController : ModalController,
              private navCtrl : NavController) { }

  ngOnInit() {
  }

    async presentModal() {
        const modal = await this.modalController.create({
            component: CourseFilterModalPage,
        });
        return await modal.present();
    }

    courseDetail() {
      this.navCtrl.navigateForward('course-detail');
    }

}
