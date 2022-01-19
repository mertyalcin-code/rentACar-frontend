/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CustomerCardDetailService } from './customer-card-detail.service';

describe('Service: CustomerCardDetail', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomerCardDetailService]
    });
  });

  it('should ...', inject([CustomerCardDetailService], (service: CustomerCardDetailService) => {
    expect(service).toBeTruthy();
  }));
});
