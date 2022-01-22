/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CarManagementComponent } from './car-management.component';

describe('CarManagementComponent', () => {
  let component: CarManagementComponent;
  let fixture: ComponentFixture<CarManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
