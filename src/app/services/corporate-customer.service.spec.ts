/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CorporateCustomerService } from './corporate-customer.service';

describe('Service: CorporateCustomer', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CorporateCustomerService]
    });
  });

  it('should ...', inject([CorporateCustomerService], (service: CorporateCustomerService) => {
    expect(service).toBeTruthy();
  }));
});
