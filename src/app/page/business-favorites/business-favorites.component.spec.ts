import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessFavoritesComponent } from './business-favorites.component';

describe('BusinessFavoritesComponent', () => {
  let component: BusinessFavoritesComponent;
  let fixture: ComponentFixture<BusinessFavoritesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessFavoritesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessFavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
