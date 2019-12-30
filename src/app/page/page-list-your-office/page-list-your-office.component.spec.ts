import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageListYourOfficeComponent } from './page-list-your-office.component';

describe('PageListYourOfficeComponent', () => {
  let component: PageListYourOfficeComponent;
  let fixture: ComponentFixture<PageListYourOfficeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageListYourOfficeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageListYourOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
