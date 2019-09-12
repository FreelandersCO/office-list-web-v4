import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchInputComponent } from './search-input/search-input.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        SearchInputComponent
    ],
    exports: [
        SearchInputComponent
    ]
})
export class SharedModule { }
