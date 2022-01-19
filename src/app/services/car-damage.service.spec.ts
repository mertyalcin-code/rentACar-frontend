/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CarDamageService } from './car-damage.service';

describe('Service: CarDamage', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CarDamageService]
    });
  });

  it('should ...', inject([CarDamageService], (service: CarDamageService) => {
    expect(service).toBeTruthy();
  }));
});
