import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageVirtualRoutingModule } from './page-virtual-routing.module';
import { PageVirtualComponent } from './page-virtual.component';


@NgModule({
  declarations: [PageVirtualComponent],
  imports: [
    CommonModule,
    PageVirtualRoutingModule
  ]
})
export class PageVirtualModule { }
