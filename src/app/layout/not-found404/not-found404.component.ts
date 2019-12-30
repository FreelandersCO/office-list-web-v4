import { Component, OnInit } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';

@Component({
	selector: 'office-list-not-found404',
	templateUrl: './not-found404.component.html',
	styleUrls: ['./not-found404.component.scss']
})
export class NotFound404Component implements OnInit {
	optionSuccess: AnimationOptions = {
		path: 'assets/animations/not-found.json'
	};
	constructor() { }

	ngOnInit() {
	}

}
