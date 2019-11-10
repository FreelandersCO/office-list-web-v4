import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';

import { MylistRoutingModule } from './mylist-routing.module';
import { MylistComponent } from './mylist.component';
import { SharedModule } from '@app/shared/shared.module';


@NgModule({
	declarations: [MylistComponent],
	imports: [
		CommonModule,
		MylistRoutingModule,
		SharedModule,
		NgxUsefulSwiperModule
	]
})
export class MylistModule { }
