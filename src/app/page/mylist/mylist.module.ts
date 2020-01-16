import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';

import { MylistRoutingModule } from './mylist-routing.module';
import { MylistComponent } from './mylist.component';
import { SharedModule } from '@app/shared/shared.module';;
import { NormalizeString } from '@app/shared/utils/normalize-string.pipe';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
	declarations: [MylistComponent],
	imports: [
		CommonModule,
		MylistRoutingModule,
		SharedModule,
		NgxUsefulSwiperModule,
		MatNativeDateModule,
		MatFormFieldModule,
		MatDatepickerModule,
		FormsModule,
		ReactiveFormsModule
	],
	providers: [
		NormalizeString
	],
})
export class MylistModule { }
