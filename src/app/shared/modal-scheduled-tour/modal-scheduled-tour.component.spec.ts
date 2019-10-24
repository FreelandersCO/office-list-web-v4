import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalScheduledTourComponent } from './modal-scheduled-tour.component';

describe('ModalScheduledTourComponent', () => {
  let component: ModalScheduledTourComponent;
  let fixture: ComponentFixture<ModalScheduledTourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalScheduledTourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalScheduledTourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
