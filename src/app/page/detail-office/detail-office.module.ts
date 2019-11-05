import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTooltipModule } from '@angular/material/tooltip';
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';

import { DetailOfficeRoutingModule } from './detail-office-routing.module';
import { DetailOfficeComponent } from './detail-office.component';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
	declarations: [
		DetailOfficeComponent
	],
	imports: [
		CommonModule,
		DetailOfficeRoutingModule,
		SharedModule,
		NgxUsefulSwiperModule,
		MatTooltipModule
	],
	schemas: [
		CUSTOM_ELEMENTS_SCHEMA
	]
})
export class DetailOfficeModule { }
