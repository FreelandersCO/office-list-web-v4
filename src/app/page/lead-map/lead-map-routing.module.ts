import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LeadMapComponent } from './lead-map.component';

const routes: Routes = [
	{
		path: '',
		component: LeadMapComponent
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeadMapRoutingModule { }
