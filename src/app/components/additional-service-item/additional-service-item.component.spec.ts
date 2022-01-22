/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AdditionalServiceItemComponent } from './additional-service-item.component';

describe('AdditionalServiceItemComponent', () => {
  let component: AdditionalServiceItemComponent;
  let fixture: ComponentFixture<AdditionalServiceItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdditionalServiceItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditionalServiceItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
