import { Component } from '@angular/core';

@Component({
	selector: 'office-list-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	onActivate(event) {
		window.scroll(0, 0);
	}
}
