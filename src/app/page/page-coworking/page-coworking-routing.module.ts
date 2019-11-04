import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageCoworkingComponent } from './page-coworking.component';


const routes: Routes = [
	{
		path: '',
		component: PageCoworkingComponent,
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageCoworkingRoutingModule { }
