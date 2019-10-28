import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition, query, animateChild } from '@angular/animations';

@Component({
	selector: 'office-list-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
	animations: [
		trigger('ngIfAnimation', [
			transition(':enter, :leave', [
				query('@*', animateChild(), { optional: true })
			])
		]),
		trigger('easeIn', [
			transition('void => *', [
				style({
					height: 0,
					opacity: 0,
				}),
				animate('500ms ease-in', style({
					height: 100,
					opacity: 1,
				}))
			]),
			transition('* => void', [
				style({
					height: 100,
					opacity: 1,
				}),
				animate('500ms ease-in', style({
					height: 0,
					opacity: 0,
				}))
			])
		])
	]
})
export class HeaderComponent implements OnInit {
	public status = false;
	public optionsNav = false;
	public optionsNavShow = 'Show';
	public showSignUp = false;
	constructor() { }

	ngOnInit() {
	}

	openMenu() {
		this.status = !this.status;
	}

	toogleSignUp() {
		this.showSignUp = !this.showSignUp;
	}

	showOptionsNav() {
		this.optionsNav = !this.optionsNav;
		this.optionsNavShow = this.optionsNav ? 'Show' : 'Hide';
	}
}
