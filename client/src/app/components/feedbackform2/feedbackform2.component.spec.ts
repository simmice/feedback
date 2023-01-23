import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Feedbackform2Component } from './feedbackform2.component';

describe('Feedbackform2Component', () => {
  let component: Feedbackform2Component;
  let fixture: ComponentFixture<Feedbackform2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Feedbackform2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Feedbackform2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
