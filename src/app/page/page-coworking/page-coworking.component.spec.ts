import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageCoworkingComponent } from './page-coworking.component';

describe('PageCoworkingComponent', () => {
  let component: PageCoworkingComponent;
  let fixture: ComponentFixture<PageCoworkingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageCoworkingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageCoworkingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
