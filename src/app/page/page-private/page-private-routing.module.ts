import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagePrivateComponent } from './page-private.component';

const routes: Routes = [
	{
		path: '',
		component: PagePrivateComponent,
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagePrivateRoutingModule { }
