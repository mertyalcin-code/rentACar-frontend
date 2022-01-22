/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SegmentAddComponent } from './segment-add.component';

describe('SegmentAddComponent', () => {
  let component: SegmentAddComponent;
  let fixture: ComponentFixture<SegmentAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SegmentAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SegmentAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
