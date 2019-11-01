import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageResourcesRoutingModule } from './page-resources-routing.module';
import { PageResourcesComponent } from './page-resources.component';


@NgModule({
  declarations: [PageResourcesComponent],
  imports: [
    CommonModule,
    PageResourcesRoutingModule
  ]
})
export class PageResourcesModule { }
