import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';

import { PageListYourOfficeRoutingModule } from './page-list-your-office-routing.module';
import { PageListYourOfficeComponent } from './page-list-your-office.component';


@NgModule({
  declarations: [PageListYourOfficeComponent],
  imports: [
	CommonModule,
	SharedModule,
    PageListYourOfficeRoutingModule
  ]
})
export class PageListYourOfficeModule { }
