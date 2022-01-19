/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AdditionalServiceItemService } from './additionalServiceItem.service';

describe('Service: AdditionalServiceItem', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdditionalServiceItemService]
    });
  });

  it('should ...', inject([AdditionalServiceItemService], (service: AdditionalServiceItemService) => {
    expect(service).toBeTruthy();
  }));
});
