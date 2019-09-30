import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'office-list-bc-card',
	templateUrl: './bc-card.component.html',
	styleUrls: ['./bc-card.component.scss']
})
export class BcCardComponent implements OnInit {
	@Input() bc;
	constructor() { }

	ngOnInit() {
	}

}
