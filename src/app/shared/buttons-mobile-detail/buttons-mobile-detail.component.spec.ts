import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonsMobileDetailComponent } from './buttons-mobile-detail.component';

describe('ButtonsMobileDetailComponent', () => {
  let component: ButtonsMobileDetailComponent;
  let fixture: ComponentFixture<ButtonsMobileDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonsMobileDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonsMobileDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
