import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageFaqRoutingModule } from './page-faq-routing.module';
import { PageFaqComponent } from './page-faq.component';


@NgModule({
  declarations: [PageFaqComponent],
  imports: [
    CommonModule,
    PageFaqRoutingModule
  ]
})
export class PageFaqModule { }
