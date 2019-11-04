import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageSitemapComponent } from './page-sitemap.component';

describe('PageSitemapComponent', () => {
  let component: PageSitemapComponent;
  let fixture: ComponentFixture<PageSitemapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageSitemapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageSitemapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
