import { Component, OnInit } from '@angular/core';
import { trigger, style, animate, transition, query, animateChild } from '@angular/animations';
import { EventEmitterService } from '@app/services/event-emitter.service';
import { LocalStorageService } from '@app/services/storage.service';

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
	public showLogin = false;
	public showTour = false;
	public listOffice = false;
	bcFavorites;
	favoritesCount;
	constructor(private eventEmitterService: EventEmitterService, private localStorageService: LocalStorageService) { }

	ngOnInit() {
		if (this.eventEmitterService.subsVar === undefined) {
			this.eventEmitterService.toogleSignUp.subscribe((name: string) => {
				this.showLogin = false;
				this.toogleSignUp();
			});
			this.eventEmitterService.toogleLogin.subscribe((name: string) => {
				this.showSignUp = false;
				this.toogleLogin();
			});
			this.eventEmitterService.favoriteAdded.subscribe((name: string) => {
				this.getBussinesFavorites();
			});
			this.eventEmitterService.toogleTourHeader.subscribe((name: string) => {
				this.toogleTour();
			});
		}
		this.getBussinesFavorites();
	}

	async getBussinesFavorites() {
		this.bcFavorites = await this.localStorageService.getItem('bc_favorites');
		this.favoritesCount = this.bcFavorites.length;
		if (this.favoritesCount >= 6) {
			this.showSignUp = true;
		}
	}

	openMenu() {
		this.status = !this.status;
	}

	toogleSignUp() {
		this.showSignUp = !this.showSignUp;
	}

	toogleLogin() {
		this.showLogin = !this.showLogin;
	}

	showOptionsNav() {
		this.optionsNav = !this.optionsNav;
		this.optionsNavShow = this.optionsNav ? 'Show' : 'Hide';
	}

	toogleTour() {
		this.showTour = !this.showTour;
	}
}
