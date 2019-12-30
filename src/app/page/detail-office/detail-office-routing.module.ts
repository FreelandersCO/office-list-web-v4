import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailOfficeComponent } from './detail-office.component';

const routes: Routes = [
	{
		path: '',
		component: DetailOfficeComponent,
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetailOfficeRoutingModule { }
