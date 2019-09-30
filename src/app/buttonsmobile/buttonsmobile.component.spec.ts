import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonsmobileComponent } from './buttonsmobile.component';

describe('ButtonsmobileComponent', () => {
  let component: ButtonsmobileComponent;
  let fixture: ComponentFixture<ButtonsmobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonsmobileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonsmobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
