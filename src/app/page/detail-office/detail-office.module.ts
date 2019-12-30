import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';
import { NgxSpinnerModule } from 'ngx-spinner';

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
		NgxSpinnerModule
	]
})
export class DetailOfficeModule { }
