import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalLoginSearchComponent } from './modal-login-search.component';

describe('ModalLoginSearchComponent', () => {
  let component: ModalLoginSearchComponent;
  let fixture: ComponentFixture<ModalLoginSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalLoginSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalLoginSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
