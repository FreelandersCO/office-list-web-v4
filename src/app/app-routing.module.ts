import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		loadChildren: () => import('./page/home/home.module').then(m => m.HomeModule)
	},
	{
		path: 'office-space-for-rent',
		loadChildren: () => import('./page/business-list/business-list.module').then(m => m.BusinessListModule)
	},
	{
		path: 'detail-office',
		loadChildren: () => import('./page/detail-office/detail-office.module').then(m => m.DetailOfficeModule)
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes, {
		scrollPositionRestoration: 'enabled'
	})],
	exports: [RouterModule]
})
export class AppRoutingModule { }
