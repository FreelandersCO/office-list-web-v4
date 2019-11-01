import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageVirtualComponent } from './page-virtual.component';

const routes: Routes = [
	{
		path: '',
		component: PageVirtualComponent,
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageVirtualRoutingModule { }
