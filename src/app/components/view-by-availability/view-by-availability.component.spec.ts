import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewByAvailabilityComponent } from './view-by-availability.component';
import { beforeEach, describe } from 'node:test';

describe('ViewByAvailabilityComponent', () => {
  let component: ViewByAvailabilityComponent;
  let fixture: ComponentFixture<ViewByAvailabilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewByAvailabilityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewByAvailabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
