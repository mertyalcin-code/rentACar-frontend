/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { InvoiceCorporateCustomerDetailComponent } from './invoice-corporate-customer-detail.component';

describe('InvoiceCorporateCustomerDetailComponent', () => {
  let component: InvoiceCorporateCustomerDetailComponent;
  let fixture: ComponentFixture<InvoiceCorporateCustomerDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceCorporateCustomerDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceCorporateCustomerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
