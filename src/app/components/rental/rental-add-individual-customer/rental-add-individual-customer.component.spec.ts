/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RentalAddForIndividualCustomerComponent } from './rental-add-individual-customer.component';

describe('RentalAddComponent', () => {
  let component: RentalAddForIndividualCustomerComponent;
  let fixture: ComponentFixture<RentalAddForIndividualCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentalAddForIndividualCustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentalAddForIndividualCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
