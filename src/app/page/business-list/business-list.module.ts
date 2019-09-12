import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BusinessListRoutingModule } from './business-list-routing.module';
import { BusinessListComponent } from './business-list.component';

@NgModule({
    declarations: [BusinessListComponent],
    imports: [
        CommonModule,
        BusinessListRoutingModule
    ]
})
export class BusinessListModule { }
