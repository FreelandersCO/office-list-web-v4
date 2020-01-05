import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BusinessFavoritesRoutingModule } from './business-favorites-routing.module';
import { BusinessFavoritesComponent } from './business-favorites.component';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [BusinessFavoritesComponent],
  imports: [
	CommonModule,
	SharedModule,
    BusinessFavoritesRoutingModule
  ]
})
export class BusinessFavoritesModule { }
