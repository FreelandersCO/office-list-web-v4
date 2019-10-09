import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BusinessListRoutingModule } from './business-list-routing.module';
import { BusinessListComponent } from './business-list.component';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
	declarations: [BusinessListComponent],
	imports: [
		CommonModule,
		BusinessListRoutingModule,
		SharedModule
	]
})
export class BusinessListModule { }
