import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormInquireNowComponent } from './form-inquire-now.component';

describe('FormInquireNowComponent', () => {
  let component: FormInquireNowComponent;
  let fixture: ComponentFixture<FormInquireNowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormInquireNowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormInquireNowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
