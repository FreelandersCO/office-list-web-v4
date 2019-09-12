import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchInputComponent } from './search-input/search-input.component';
import { CallUsComponent } from './call-us/call-us.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        SearchInputComponent,
        CallUsComponent
    ],
    exports: [
        SearchInputComponent,
        CallUsComponent
    ]
})
export class SharedModule { }
