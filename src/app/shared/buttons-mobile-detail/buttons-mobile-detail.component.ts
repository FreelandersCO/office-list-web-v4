import { Component, OnInit } from '@angular/core';
import { EventEmitterService } from '@app/services/event-emitter.service';

@Component({
	selector: 'office-list-buttons-mobile-detail',
	templateUrl: './buttons-mobile-detail.component.html',
	styleUrls: ['./buttons-mobile-detail.component.scss']
})
export class ButtonsMobileDetailComponent implements OnInit {

	constructor(private eventEmitter: EventEmitterService) { }

	ngOnInit() {
	}
	callSingUp() {
		this.eventEmitter.toogleSingUpEmitter();
	}
}
