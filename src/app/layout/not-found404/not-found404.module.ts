import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFound404RoutingModule } from './not-found404-routing.module';
import { NotFound404Component } from './not-found404.component';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
	declarations: [
		NotFound404Component
	],
	imports: [
		CommonModule,
		NotFound404RoutingModule,
		SharedModule
	]
})
export class NotFound404Module { }
