import { Component, OnInit } from '@angular/core';
import { EventEmitterService } from '@app/services/event-emitter.service';

@Component({
	selector: 'office-list-modal-login-search',
	templateUrl: './modal-login-search.component.html',
	styleUrls: ['./modal-login-search.component.scss']
})
export class ModalLoginSearchComponent implements OnInit {

	constructor(private eventEmitter: EventEmitterService) { }

	ngOnInit() {
	}
	closeLogin() {
		this.eventEmitter.toogleLoginEmitter();
	}
	callSingUp() {
		this.eventEmitter.toogleSingUpEmitter();
	}
}
