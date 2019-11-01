import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageVirtualComponent } from './page-virtual.component';

describe('PageVirtualComponent', () => {
  let component: PageVirtualComponent;
  let fixture: ComponentFixture<PageVirtualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageVirtualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageVirtualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
