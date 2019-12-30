import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LottieModule } from 'ngx-lottie';

import { NotFound404RoutingModule } from './not-found404-routing.module';
import { NotFound404Component } from './not-found404.component';

@NgModule({
	declarations: [
		NotFound404Component
	],
	imports: [
		CommonModule,
		NotFound404RoutingModule,
		LottieModule
	]
})
export class NotFound404Module { }
