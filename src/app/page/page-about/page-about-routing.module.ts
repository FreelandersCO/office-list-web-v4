import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageAboutComponent } from './page-about.component';

const routes: Routes = [
	{
		path: '',
		component: PageAboutComponent,
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageAboutRoutingModule { }
