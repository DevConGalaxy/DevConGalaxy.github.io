import { TestBed } from '@angular/core/testing';

import { MeetupService } from './meetup.service';

describe('MeetupService', () => {
  let service: MeetupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MeetupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
