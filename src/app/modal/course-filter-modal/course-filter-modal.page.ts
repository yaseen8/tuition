import { Component, OnInit } from '@angular/core';
import {ModalController} from "@ionic/angular";
import { StudyLevelService } from '../../services/study-level/study-level.service';
import { SubjectService } from '../../services/subjects/subject.service';
import { LoaderService } from '../../services/loader/loader.service';

@Component({
  selector: 'app-course-filter-modal',
  templateUrl: './course-filter-modal.page.html',
  styleUrls: ['./course-filter-modal.page.scss'],
})
export class CourseFilterModalPage implements OnInit {

  studyLevelList = [];
  subjectList = [];
  course : number;
  startDate : string;
  studyLevel : number;

  constructor(private modalCtrl : ModalController,
              private studyLevelService : StudyLevelService,
              private subjectService : SubjectService,
              private loaderService : LoaderService) { 
              }

  ngOnInit() {
    this.getStudyLevelList();
  }

  getStudyLevelList() {
    this.studyLevelService.getStudyLevelList()
        .subscribe(
            (resp : any) => {
              this.studyLevelList = resp;
              console.log(resp);
            }
        )
  }

    getSubjects(id) {
      this.studyLevel = id;
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

    dismiss() {
      let date;
      if(this.startDate) {
       date = this.startDate.split('T')[0];
      }
        this.modalCtrl.dismiss(
          {
            'study_level' : this.studyLevel,
            'course_id' : this.course,
            'start_date' : date
          }
        );
    }

}
