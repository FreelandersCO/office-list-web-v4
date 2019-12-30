import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventEmitterService } from '@app/services/event-emitter.service';
import { SharedModule } from '@shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

@NgModule({
	declarations: [HomeComponent],
	imports: [
		CommonModule,
		HomeRoutingModule,
		SharedModule
	],
	schemas: [
		CUSTOM_ELEMENTS_SCHEMA
	],
	providers: [
		EventEmitterService
	]
})
export class HomeModule { }
