import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

@Component({
	selector: 'office-list-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

	constructor(
		@Inject(PLATFORM_ID) private platformId) {

	}

	ngOnInit(): void {
		if (isPlatformBrowser(this.platformId)) {
			window.scroll();
		}
	}
}
