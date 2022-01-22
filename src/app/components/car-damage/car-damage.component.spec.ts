/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CarDamageComponent } from './car-damage.component';

describe('CarDamageComponent', () => {
  let component: CarDamageComponent;
  let fixture: ComponentFixture<CarDamageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarDamageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarDamageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
