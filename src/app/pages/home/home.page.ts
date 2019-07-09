import { Component } from '@angular/core';
import {StudyLevelService} from "../../services/study-level/study-level.service";
import {SubjectService} from "../../services/subjects/subject.service";
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  studyLevelList = [] ;
  subjectList   = [];
  course : number;

  constructor(private studyLevelService : StudyLevelService,
              private subjectService : SubjectService,
              private navCtrl : NavController) {}

    ngOnInit(){
        this.getStudyLevelList()
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
        this.subjectService.getSubjectsList(id)
            .subscribe(
                (resp : any) => {
                    this.subjectList = resp;
                }
            )
    }

    getCourseList() {
        this.navCtrl.navigateForward('course-list/' + this.course)
    }
}
