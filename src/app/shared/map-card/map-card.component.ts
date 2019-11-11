import { Component, OnChanges, Input, SimpleChanges, SimpleChange } from '@angular/core';
import { EventEmitterService } from '@app/services/event-emitter.service';

@Component({
	selector: 'office-list-map-card',
	templateUrl: './map-card.component.html',
	styleUrls: ['./map-card.component.scss']
})
export class MapCardComponent implements OnChanges {
	@Input() businessInfo;
	business;
	constructor(private eventEmitter: EventEmitterService) { }

	ngOnChanges(changes: SimpleChanges) {
		const businessInfo: SimpleChange = changes.businessInfo;
		if (businessInfo.currentValue != null) {
			this.business = businessInfo.currentValue;
		}
	}

	callSingUp() {
		this.eventEmitter.toogleSingUpEmitter();
	}
}
