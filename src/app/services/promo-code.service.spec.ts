/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PromoCodeService } from './promo-code.service';

describe('Service: PromoCode', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PromoCodeService]
    });
  });

  it('should ...', inject([PromoCodeService], (service: PromoCodeService) => {
    expect(service).toBeTruthy();
  }));
});
