import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from '../../services/courses/courses.service';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.page.html',
  styleUrls: ['./course-detail.page.scss'],
})
export class CourseDetailPage implements OnInit {
  courseDetail = {};
  title : string;
  fee : string;
  name : string;

  constructor(private activatedRoute : ActivatedRoute,
              private courseService : CoursesService) {
    this.activatedRoute.params.subscribe(
      (resp) => {
        this.getCourseDetail(resp['id']);
      }
    )
   }

  ngOnInit() {
  }

  getCourseDetail(id) {
    this.courseService.getCourseDetail(id)
    .subscribe(
      (resp) => {
        this.courseDetail = resp;
        this.fee = resp['course_fee']['fee'];
        this.name = resp['teacher']['name'];
        console.log(resp);
      }
    )
  }

}
