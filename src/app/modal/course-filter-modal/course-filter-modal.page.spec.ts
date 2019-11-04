import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseFilterModalPage } from './course-filter-modal.page';

describe('CourseFilterModalPage', () => {
  let component: CourseFilterModalPage;
  let fixture: ComponentFixture<CourseFilterModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseFilterModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseFilterModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
