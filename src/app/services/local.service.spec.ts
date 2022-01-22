/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LocalService } from './local.service';

describe('Service: Local', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalService]
    });
  });

  it('should ...', inject([LocalService], (service: LocalService) => {
    expect(service).toBeTruthy();
  }));
});
