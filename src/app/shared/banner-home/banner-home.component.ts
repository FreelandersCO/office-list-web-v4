import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'office-list-banner-home',
	templateUrl: './banner-home.component.html',
	styleUrls: ['./banner-home.component.scss']
})
export class BannerHomeComponent implements OnInit {
	@Input() notFound = false;
	constructor() { }

	ngOnInit() {
	}

}
