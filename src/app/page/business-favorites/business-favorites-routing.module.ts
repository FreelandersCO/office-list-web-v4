import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BusinessFavoritesComponent } from './business-favorites.component';

const routes: Routes = [
	{
		path: '',
		component: BusinessFavoritesComponent,
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinessFavoritesRoutingModule { }
