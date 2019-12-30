import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageFaqComponent } from './page-faq.component'

const routes: Routes = [
	{
		path: '',
		component: PageFaqComponent,
	}
];
	

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageFaqRoutingModule { }
