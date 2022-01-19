/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { IndividualCustomerService } from './individual-customer.service';

describe('Service: IndividualCustomer', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IndividualCustomerService]
    });
  });

  it('should ...', inject([IndividualCustomerService], (service: IndividualCustomerService) => {
    expect(service).toBeTruthy();
  }));
});
