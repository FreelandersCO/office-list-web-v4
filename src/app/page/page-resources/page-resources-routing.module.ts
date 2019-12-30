import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageResourcesComponent } from './page-resources.component'

const routes: Routes = [
	{
		path: '',
		component: PageResourcesComponent,
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageResourcesRoutingModule { }
