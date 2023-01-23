import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Feedbackform3Component } from './feedbackform3.component';

describe('Feedbackform3Component', () => {
  let component: Feedbackform3Component;
  let fixture: ComponentFixture<Feedbackform3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Feedbackform3Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Feedbackform3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
