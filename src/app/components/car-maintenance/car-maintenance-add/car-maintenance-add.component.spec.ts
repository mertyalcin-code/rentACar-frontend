/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CarMaintenanceAddComponent } from './car-maintenance-add.component';

describe('CarMaintenanceAddComponent', () => {
  let component: CarMaintenanceAddComponent;
  let fixture: ComponentFixture<CarMaintenanceAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarMaintenanceAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarMaintenanceAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
