import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageListYourOfficeComponent } from './page-list-your-office.component';

const routes: Routes = [
	{
		path: '',
		component: PageListYourOfficeComponent,
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageListYourOfficeRoutingModule { }
