import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageCoworkingRoutingModule } from './page-coworking-routing.module';
import { PageCoworkingComponent } from './page-coworking.component';


@NgModule({
  declarations: [PageCoworkingComponent],
  imports: [
    CommonModule,
    PageCoworkingRoutingModule
  ]
})
export class PageCoworkingModule { }
