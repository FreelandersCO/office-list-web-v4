import { Component } from '@angular/core';

@Component({
	selector: 'office-list-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	title = 'page-v4';

	onActivate(event) {
		window.scroll(0, 0);
	}
}
