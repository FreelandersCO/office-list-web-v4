import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageSitemapComponent } from './page-sitemap.component';

const routes: Routes = [
	{
		path: '',
		component: PageSitemapComponent,
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageSitemapRoutingModule { }
