import { TestBed } from '@angular/core/testing';

import { BookCourseService } from './book-course.service';

describe('BookCourseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BookCourseService = TestBed.get(BookCourseService);
    expect(service).toBeTruthy();
  });
});
