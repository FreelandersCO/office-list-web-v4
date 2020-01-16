import { Component, OnInit } from '@angular/core';
import { trigger, style, animate, transition, query, animateChild } from '@angular/animations';
import { ApiServicesService } from '@app/services/api-services.service';
import { Title, Meta } from '@angular/platform-browser';

@Component({
	selector: 'office-list-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
	animations: [
		trigger('ngIfAnimation', [
			transition(':enter, :leave', [
				query('@*', animateChild())
			])
		]),
		trigger('easeInOut', [
			transition('void => *', [
				style({
					height: 0,
					opacity: 0
				}),
				animate('500ms ease-in', style({
					height: 100,
					opacity: 1
				}))
			]),
			transition('* => void', [
				style({
					height: 100,
					opacity: 1
				}),
				animate('500ms ease-in', style({
					height: 0,
					opacity: 0
				}))
			])
		])
	]
})
export class HomeComponent implements OnInit {
	public formPressedShow = false;
	public pressedShow = 'Show';
	public populareCities = [
		{
			name: 'New York',
			url: 'office-space-for-rent/us/new-york/new-york',
			numBc: 199,
			img: './assets/images/cities/home/nyc.jpg'
		},
		{
			name: 'Los Angeles',
			url: 'office-space-for-rent/us/california/los-angeles',
			numBc: 79,
			img: './assets/images/cities/home/la.jpg'
		},
		{
			name: 'Atlanta',
			url: 'office-space-for-rent/us/georgia/atlanta',
			numBc: 58,
			img: './assets/images/cities/home/atlanta.jpg'
		},
		{
			name: 'Chicago',
			url: 'office-space-for-rent/us/illinois/chicago',
			numBc: 71,
			img: './assets/images/cities/home/chicago.jpg'
		},
		{
			name: 'Miami',
			url: 'office-space-for-rent/us/florida/miami',
			numBc: 42,
			img: './assets/images/cities/home/miami.jpg'
		},
		{
			name: 'San Francisco',
			url: 'office-space-for-rent/us/california/san-francisco',
			numBc: 44,
			img: './assets/images/cities/home/SanFrancisco.jpg'
		},
		{
			name: 'Dallas',
			url: 'office-space-for-rent/us/texas/dallas',
			numBc: 46,
			img: ''
		},
		{
			name: 'Houston',
			url: 'office-space-for-rent/us/texas/houston',
			numBc: 57,
			img: ''
		},
		{
			name: 'Boston',
			url: 'office-space-for-rent/us/massachusetts/boston',
			numBc: 36,
			img: ''
		},
		{
			name: 'San Diego',
			url: 'office-space-for-rent/us/california/san-diego',
			numBc: 32,
			img: ''
		},
		{
			name: 'Portland',
			url: 'office-space-for-rent/us/oregon/portland',
			numBc: 13,
			img: ''
		},
		{
			name: 'Seattle',
			url: 'office-space-for-rent/us/washington/seattle',
			numBc: 30,
			img: ''
		},
		{
			name: 'Tampa',
			url: 'office-space-for-rent/us/florida/tampa',
			numBc: 22,
			img: ''
		},
		{
			name: 'Toronto',
			url: 'office-space-for-rent/ca/ontario/toronto',
			numBc: 55,
			img: ''
		},
		{
			name: 'Washington',
			url: 'office-space-for-rent/us/district-of-columbia/washington',
			numBc: 45,
			img: ''
		}
	];
	constructor(
		private api: ApiServicesService,
		private titleService: Title,
		private meta: Meta) { }

	ngOnInit() {
		this.api.getPageMeta(
			'page',
			'home'
		).subscribe(result => this.processDataSEO(result));
	}
	processDataSEO(result) {
		// SEO
		const title =
		this.titleService.setTitle(result.metatitle);
		this.meta.addTag({ name: 'description', content: result.metadescription });
	}
	toggleFormPressed() {
		this.formPressedShow = !this.formPressedShow;
		this.pressedShow = this.formPressedShow ? 'Hide' : 'Show';
	}
	// tslint:disable-next-line: max-file-line-count
}
