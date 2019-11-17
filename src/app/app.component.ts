import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Router , NavigationEnd} from '@angular/router';

import { filter } from 'rxjs/operators';

declare var gtag;

@Component({
	selector: 'office-list-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

	constructor(
		@Inject(PLATFORM_ID) private platformId,
		private router: Router) {
		const navEndEvents$ = this.router.events
			.pipe(
				filter(event => event instanceof NavigationEnd)
			);

		navEndEvents$.subscribe((event: NavigationEnd) => {
			gtag('config', 'UA-219071-1', {
				'page_path': event.urlAfterRedirects
			});
		});
	}

	ngOnInit(): void {
		if (isPlatformBrowser(this.platformId)) {
			window.scroll();
		}
	}

	onActivate(event) {
		window.scroll(0, 0);
	}
}
