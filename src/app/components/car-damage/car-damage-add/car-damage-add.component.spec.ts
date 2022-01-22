/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CarDamageAddComponent } from './car-damage-add.component';

describe('CarDamageAddComponent', () => {
  let component: CarDamageAddComponent;
  let fixture: ComponentFixture<CarDamageAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarDamageAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarDamageAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
