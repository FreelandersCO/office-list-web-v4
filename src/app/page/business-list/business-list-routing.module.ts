import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BusinessListComponent } from './business-list.component';
import { DetailOfficeModule } from '../detail-office/detail-office.module';

const routes: Routes = [
	{
		path: ':country/:state/:city',
		component: BusinessListComponent,
	},
	{
		path: ':country/:state/:city/:bc_url',
		loadChildren: () => import('../detail-office/detail-office.module').then(m => m.DetailOfficeModule),
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class BusinessListRoutingModule { }
