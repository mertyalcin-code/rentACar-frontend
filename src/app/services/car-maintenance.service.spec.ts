/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CarMaintenanceService } from './car-maintenance.service';

describe('Service: CarMaintenance', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CarMaintenanceService]
    });
  });

  it('should ...', inject([CarMaintenanceService], (service: CarMaintenanceService) => {
    expect(service).toBeTruthy();
  }));
});
