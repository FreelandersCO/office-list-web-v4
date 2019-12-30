import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagePrivacyRoutingModule } from './page-privacy-routing.module';
import { PagePrivacyComponent } from './page-privacy.component';


@NgModule({
  declarations: [PagePrivacyComponent],
  imports: [
    CommonModule,
    PagePrivacyRoutingModule
  ]
})
export class PagePrivacyModule { }
