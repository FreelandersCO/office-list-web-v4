import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFound404Component } from './not-found404.component';

const routes: Routes = [
	{
		path: '',
		component: NotFound404Component,
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotFound404RoutingModule { }
