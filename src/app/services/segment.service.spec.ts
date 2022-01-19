/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SegmentService } from './segment.service';

describe('Service: Segment', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SegmentService]
    });
  });

  it('should ...', inject([SegmentService], (service: SegmentService) => {
    expect(service).toBeTruthy();
  }));
});
