import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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
		loadChildren: () => import('./page/mylist/mylist.module').then(m => m.MylistModule)
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
		path: 'private-office',
		loadChildren: () => import('./page/page-private/page-private.module').then(m => m.PagePrivateModule)
	},
	{
		path: 'coworking-office',
		loadChildren: () => import('./page/page-coworking/page-coworking.module').then(m => m.PageCoworkingModule)
	},
	{
		path: 'privacy',
		loadChildren: () => import('./page/page-privacy/page-privacy.module').then(m => m.PagePrivacyModule)
	},
	{
		path: 'site-map',
		loadChildren: () => import('./page/page-sitemap/page-sitemap.module').then(m => m.PageSitemapModule)
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes, {
		scrollPositionRestoration: 'enabled'
	})],
	exports: [RouterModule]
})
export class AppRoutingModule { }
