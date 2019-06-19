import { Component } from '@angular/core';
import {StudyLevelService} from "../../services/study-level/study-level.service";
import {SubjectService} from "../../services/subjects/subject.service";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  studyLevelList = [] ;
  subjectList   = [];

  constructor(private studyLevelService : StudyLevelService,
              private subjectService : SubjectService) {}

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
        this.subjectService.getSubjectsList()
            .subscribe(
                (resp : any) => {
                    this.subjectList = resp;
                }
            )
    }
}
