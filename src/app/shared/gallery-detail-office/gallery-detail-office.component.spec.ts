import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryDetailOfficeComponent } from './gallery-detail-office.component';

describe('GalleryDetailOfficeComponent', () => {
  let component: GalleryDetailOfficeComponent;
  let fixture: ComponentFixture<GalleryDetailOfficeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GalleryDetailOfficeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryDetailOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
