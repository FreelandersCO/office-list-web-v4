import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeviceDetectorModule } from 'ngx-device-detector';

import { BusinessListRoutingModule } from './business-list-routing.module';
import { BusinessListComponent } from './business-list.component';
import { SharedModule } from '@app/shared/shared.module';
import { NormalizaeString } from './normalize-string.pipe';

@NgModule({
	declarations: [
		NormalizaeString,
		BusinessListComponent
	],
	imports: [
		CommonModule,
		BusinessListRoutingModule,
		SharedModule,
		DeviceDetectorModule.forRoot()
	]
})
export class BusinessListModule { }
