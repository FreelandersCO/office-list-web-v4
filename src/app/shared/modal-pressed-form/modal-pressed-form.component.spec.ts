import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPressedFormComponent } from './modal-pressed-form.component';

describe('ModalPressedFormComponent', () => {
  let component: ModalPressedFormComponent;
  let fixture: ComponentFixture<ModalPressedFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalPressedFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalPressedFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
