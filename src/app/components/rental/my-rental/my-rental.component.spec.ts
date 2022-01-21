/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MyRentalComponent } from './my-rental.component';

describe('MyRentalComponent', () => {
  let component: MyRentalComponent;
  let fixture: ComponentFixture<MyRentalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyRentalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyRentalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
