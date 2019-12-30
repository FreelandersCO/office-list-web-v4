import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MylistTokenComponent } from './mylist-token.component';

const routes: Routes = [
	{
		path: '',
		component: MylistTokenComponent,
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MylistTokenRoutingModule { }
