import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModuleGuardService } from '@app/services/module-guard.service';
import { BusinessListComponent } from './business-list.component';
import { DetailOfficeComponent } from '../detail-office/detail-office.component';

const routes: Routes = [
	{
		path: ':country/:state/:city',
		children: [
			{
				path: '',
				component: BusinessListComponent,
			},
			{
				path: ':zip_code',
				component: BusinessListComponent,
			},
			{
				path: 'office/:office_name',
				loadChildren: () => import('../detail-office/detail-office.module').then(m => m.DetailOfficeModule)
			}
		]
	},
	/*{
		path: ':country/:state/:city/:zip',
		component: BusinessListComponent
	},
	{
		path: ':country/:state/:city/Buss/:name_bc',
		loadChildren: () => import('../detail-office/detail-office.module').then(m => m.DetailOfficeModule),
		canActivate: [ModuleGuardService],
		data: { type: ['details'] }
	}*/
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class BusinessListRoutingModule { }
