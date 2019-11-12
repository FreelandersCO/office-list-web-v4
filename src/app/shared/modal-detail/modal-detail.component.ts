import { Component, OnInit, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';

import { ApiServicesService } from '@app/services/api-services.service';
import { EventEmitterService } from '@app/services/event-emitter.service';

@Component({
	selector: 'office-list-modal-detail',
	templateUrl: './modal-detail.component.html',
	styleUrls: ['./modal-detail.component.scss']
})
export class ModalDetailComponent implements OnChanges, OnInit {
	@Input() businessId;
	business;

	modalDetailInfo: boolean;

	constructor(private api: ApiServicesService, private eventEmitter: EventEmitterService) {
		this.modalDetailInfo = true;
	}

	ngOnInit() {
	}

	ngOnChanges(changes: SimpleChanges) {
		const businessId: SimpleChange = changes.businessId;
		if (businessId.currentValue != null) {
			this.api.getBussinesDetails(businessId.currentValue)
				.subscribe(result => this.processData(result));
		}
	}

	processData(result) {
		this.business = result.businesCentersInfo;
	}

	openSignUp() {
		this.closeModal();
		this.eventEmitter.detailsEmitter();
	}

	openTour() {
		this.closeModal();
		this.eventEmitter.toogleTourEmitter();
	}

	closeModal() {
		this.modalDetailInfo = false;
	}

}
