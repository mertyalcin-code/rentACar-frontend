/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CorporateCustomerComponent } from './corporate-customer.component';

describe('CorporateCustomerComponent', () => {
  let component: CorporateCustomerComponent;
  let fixture: ComponentFixture<CorporateCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateCustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
