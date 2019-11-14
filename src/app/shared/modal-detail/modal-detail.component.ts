import { Component, OnInit, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';

import { ApiServicesService } from '@app/services/api-services.service';
import { EventEmitterService } from '@app/services/event-emitter.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
	selector: 'office-list-modal-detail',
	templateUrl: './modal-detail.component.html',
	styleUrls: ['./modal-detail.component.scss']
})
export class ModalDetailComponent implements OnChanges, OnInit {
	@Input() businessId;
	business;

	constructor(private api: ApiServicesService, private eventEmitter: EventEmitterService, private spinner: NgxSpinnerService) {

	}

	ngOnInit() {
		this.spinner.show('loadingModal');
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
		this.spinner.hide('loadingModal');
	}

	openSignUp() {
		this.eventEmitter.toogleDetailsEmitter();
		this.eventEmitter.toogleSingUpEmitter();
	}

	openTour() {
		this.eventEmitter.toogleDetailsEmitter();
		this.eventEmitter.toogleTourEmitter();
	}

	closeModal() {
		this.eventEmitter.toogleDetailsEmitter();
	}

}
