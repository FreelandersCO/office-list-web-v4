import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgSelectModule } from '@ng-select/ng-select';

import { BusinessListRoutingModule } from './business-list-routing.module';
import { BusinessListComponent } from './business-list.component';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
	declarations: [
		BusinessListComponent
	],
	imports: [
		CommonModule,
		BusinessListRoutingModule,
		SharedModule,
		DeviceDetectorModule.forRoot(),
		NgxSpinnerModule,
		NgSelectModule
	]
})
export class BusinessListModule { }
