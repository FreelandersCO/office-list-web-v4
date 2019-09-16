import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BcCardComponent } from './bc-card.component';

describe('BcCardComponent', () => {
    let component: BcCardComponent;
    let fixture: ComponentFixture<BcCardComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [BcCardComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BcCardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
