import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageSitemapRoutingModule } from './page-sitemap-routing.module';
import { PageSitemapComponent } from './page-sitemap.component';

@NgModule({
  declarations: [PageSitemapComponent],
  imports: [
    CommonModule,
    PageSitemapRoutingModule
  ]
})
export class PageSitemapModule { }
