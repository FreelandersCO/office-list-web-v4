import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SvglikeheartComponent } from './svglikeheart.component';

describe('SvglikeheartComponent', () => {
  let component: SvglikeheartComponent;
  let fixture: ComponentFixture<SvglikeheartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SvglikeheartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SvglikeheartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
