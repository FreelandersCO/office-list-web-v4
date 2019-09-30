import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: 'office-space-for-rent',
		loadChildren: () => import('./page/business-list/business-list.module').then(m => m.BusinessListModule)
	},
	{
		path: '',
		loadChildren: () => import('./page/home/home.module').then(m => m.HomeModule)
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
