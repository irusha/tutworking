import { TestBed } from '@angular/core/testing';

import { DataGrabberService } from './data-grabber.service';

describe('DataGrabberService', () => {
  let service: DataGrabberService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataGrabberService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
