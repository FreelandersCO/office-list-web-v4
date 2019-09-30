import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BusinessListComponent } from './business-list.component';

const routes: Routes = [
	{
		path: ':country/:state/:city',
		component: BusinessListComponent,
	},
	{
		path: ':country/:state/:city/:zip_code',
		component: BusinessListComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class BusinessListRoutingModule { }

// :country/:state/:city
