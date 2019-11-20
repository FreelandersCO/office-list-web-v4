import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './services/auth/auth-guard.service';
import { NotFound404Component } from './layout/not-found404/not-found404.component';

const routes: Routes = [
	{
		path: '',
		loadChildren: () => import('./page/home/home.module').then(m => m.HomeModule)
	},
	{
		path: 'office-space-for-rent',
		loadChildren: () => import('./page/business-list/business-list.module').then(m => m.BusinessListModule)
	},
	{
		path: 'detail-office',
		loadChildren: () => import('./page/detail-office/detail-office.module').then(m => m.DetailOfficeModule)
	},
	{
		path: 'my-list',
		canActivate: [AuthGuardService],
		loadChildren: () => import('./page/mylist/mylist.module').then(m => m.MylistModule)
	},
	{
		path: 'token/:token',
		loadChildren: () => import('./page/mylist-token/mylist-token.module').then(m => m.MylistTokenModule)
	},
	{
		path: 'about-us',
		loadChildren: () => import('./page/page-about/page-about.module').then(m => m.PageAboutModule)
	},
	{
		path: 'faq',
		loadChildren: () => import('./page/page-faq/page-faq.module').then(m => m.PageFaqModule)
	},
	{
		path: 'resources',
		loadChildren: () => import('./page/page-resources/page-resources.module').then(m => m.PageResourcesModule)
	},
	{
		path: 'privacy',
		loadChildren: () => import('./page/page-privacy/page-privacy.module').then(m => m.PagePrivacyModule)
	},
	{
		path: 'list-your-office',
		loadChildren: () => import('./page/page-list-your-office/page-list-your-office.module').then(m => m.PageListYourOfficeModule)
	},
	{
		path: '404',
		loadChildren: () => import('./layout/not-found404/not-found404.module').then(m => m.NotFound404Module)
	},
	{ path: '**', redirectTo: '404' }
];

@NgModule({
	imports: [RouterModule.forRoot(routes, {
		scrollPositionRestoration: 'enabled'
	})],
	exports: [RouterModule]
})
export class AppRoutingModule { }
