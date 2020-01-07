import { Component, OnInit, Input } from '@angular/core';
import { EventEmitterService } from '@app/services/event-emitter.service';

@Component({
	selector: 'office-list-modal-scheduled-tour',
	templateUrl: './modal-scheduled-tour.component.html',
	styleUrls: ['./modal-scheduled-tour.component.scss']
})
export class ModalScheduledTourComponent implements OnInit {
	tour = true;
	@Input() bcId;

	constructor(private eventEmitter: EventEmitterService) { }

	ngOnInit() {
	}

	closeTour() {
		this.eventEmitter.toogleTourHeaderEmitter(null);
	}
}
