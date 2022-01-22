/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { InvoiceIndividualCustomerDetailComponent } from './invoice-individual-customer-detail.component';

describe('InvoiceIndividualCustomerDetailComponent', () => {
  let component: InvoiceIndividualCustomerDetailComponent;
  let fixture: ComponentFixture<InvoiceIndividualCustomerDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceIndividualCustomerDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceIndividualCustomerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
