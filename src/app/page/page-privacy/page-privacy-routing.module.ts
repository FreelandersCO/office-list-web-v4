import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagePrivacyComponent } from './page-privacy.component';

const routes: Routes = [
	{
		path: '',
		component: PagePrivacyComponent,
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagePrivacyRoutingModule { }
