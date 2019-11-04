import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagePrivateRoutingModule } from './page-private-routing.module';
import { PagePrivateComponent } from './page-private.component';


@NgModule({
  declarations: [PagePrivateComponent],
  imports: [
    CommonModule,
    PagePrivateRoutingModule
  ]
})
export class PagePrivateModule { }
