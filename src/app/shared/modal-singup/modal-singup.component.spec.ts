import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSingupComponent } from './modal-singup.component';

describe('ModalSingupComponent', () => {
  let component: ModalSingupComponent;
  let fixture: ComponentFixture<ModalSingupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalSingupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSingupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
