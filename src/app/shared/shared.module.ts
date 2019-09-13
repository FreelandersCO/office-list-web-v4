import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchInputComponent } from './search-input/search-input.component';
import { CallUsComponent } from './call-us/call-us.component';
import { BcSliderComponent } from './bc-slider/bc-slider.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        SearchInputComponent,
        CallUsComponent,
        BcSliderComponent
    ],
    exports: [
        SearchInputComponent,
        CallUsComponent,
        BcSliderComponent
    ]
})
export class SharedModule { }
