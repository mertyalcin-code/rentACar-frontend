/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RentalAddCorporateCustomerComponent } from './rental-add-corporate-customer.component';

describe('RentalAddCorporateCustomerComponent', () => {
  let component: RentalAddCorporateCustomerComponent;
  let fixture: ComponentFixture<RentalAddCorporateCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentalAddCorporateCustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentalAddCorporateCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
