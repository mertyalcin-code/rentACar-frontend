/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RentalManagementComponent } from './rental-management.component';

describe('RentalManagementComponent', () => {
  let component: RentalManagementComponent;
  let fixture: ComponentFixture<RentalManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentalManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentalManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
