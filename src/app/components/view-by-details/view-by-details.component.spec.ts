import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewByDetailsComponent } from './view-by-details.component';

describe('ViewByDetailsComponent', () => {
  let component: ViewByDetailsComponent;
  let fixture: ComponentFixture<ViewByDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewByDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewByDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
