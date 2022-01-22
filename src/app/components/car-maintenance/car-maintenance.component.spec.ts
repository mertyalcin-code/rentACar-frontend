/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CarMaintenanceComponent } from './car-maintenance.component';

describe('CarMaintenanceComponent', () => {
  let component: CarMaintenanceComponent;
  let fixture: ComponentFixture<CarMaintenanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarMaintenanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
