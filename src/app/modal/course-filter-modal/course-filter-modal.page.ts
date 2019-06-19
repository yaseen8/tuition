import { Component, OnInit } from '@angular/core';
import {ModalController} from "@ionic/angular";

@Component({
  selector: 'app-course-filter-modal',
  templateUrl: './course-filter-modal.page.html',
  styleUrls: ['./course-filter-modal.page.scss'],
})
export class CourseFilterModalPage implements OnInit {

  constructor(private modalCtrl : ModalController) { }

  ngOnInit() {
  }

    dismiss() {
        this.modalCtrl.dismiss();
    }

}
