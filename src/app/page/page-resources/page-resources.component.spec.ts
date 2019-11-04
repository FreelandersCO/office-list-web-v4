import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageResourcesComponent } from './page-resources.component';

describe('PageResourcesComponent', () => {
  let component: PageResourcesComponent;
  let fixture: ComponentFixture<PageResourcesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageResourcesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
