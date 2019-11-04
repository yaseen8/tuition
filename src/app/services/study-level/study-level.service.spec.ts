import { TestBed } from '@angular/core/testing';

import { StudyLevelService } from './study-level.service';

describe('StudyLevelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StudyLevelService = TestBed.get(StudyLevelService);
    expect(service).toBeTruthy();
  });
});
