import { Component, OnInit } from '@angular/core';
import { trigger, style, animate, transition, query, animateChild } from '@angular/animations';

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
			numBc: 286,
			img: './assets/images/cities/home/nyc.webp'
		},
		{
			name: 'Los Angeles',
			url: 'office-space-for-rent/us/california/los-angeles',
			numBc: 177,
			img: './assets/images/cities/home/la.webp'
		},
		{
			name: 'Atlanta',
			url: 'office-space-for-rent/us/georgia/atlanta',
			numBc: 89,
			img: './assets/images/cities/home/atlanta.webp'
		},
		{
			name: 'Chicago',
			url: 'office-space-for-rent/us/illinois/chicago',
			numBc: 109,
			img: './assets/images/cities/home/chicago.webp'
		},
		{
			name: 'Miami',
			url: 'office-space-for-rent/us/florida/miami',
			numBc: 101,
			img: './assets/images/cities/home/miami.webp'
		},
		{
			name: 'San Francisco',
			url: 'office-space-for-rent/us/california/san-francisco',
			numBc: 96,
			img: './assets/images/cities/home/SanFrancisco.webp'
		},
		{
			name: 'Dallas',
			url: 'office-space-for-rent/us/texas/dallas',
			numBc: 109,
			img: ''
		},
		{
			name: 'Houston',
			url: 'office-space-for-rent/us/texas/houston',
			numBc: 73,
			img: ''
		},
		{
			name: 'Boston',
			url: 'office-space-for-rent/us/massachusetts/boston',
			numBc: 75,
			img: ''
		},
		{
			name: 'San Diego',
			url: 'office-space-for-rent/us/california/san-diego',
			numBc: 43,
			img: ''
		},
		{
			name: 'Portland',
			url: 'office-space-for-rent/us/oregon/portland',
			numBc: 25,
			img: ''
		},
		{
			name: 'Seattle',
			url: 'office-space-for-rent/us/washington/seattle',
			numBc: 49,
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
			numBc: 81,
			img: ''
		},
		{
			name: 'Washington',
			url: 'office-space-for-rent/us/district-of-columbia/washington',
			numBc: 44,
			img: ''
		}
	];
	constructor() { }

	ngOnInit() {
	}

	toggleFormPressed() {
		this.formPressedShow = !this.formPressedShow;
		this.pressedShow = this.formPressedShow ? 'Hide' : 'Show';
	}
// tslint:disable-next-line: max-file-line-count
}
