import { Component, OnInit, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';

import { ApiServicesService } from '@app/services/api-services.service';

@Component({
	selector: 'office-list-modal-detail',
	templateUrl: './modal-detail.component.html',
	styleUrls: ['./modal-detail.component.scss']
})
export class ModalDetailComponent implements OnChanges, OnInit {
	@Input() businessId;
	business;

	public modalDetailInfo: boolean;

	constructor(private api: ApiServicesService) {
		this.modalDetailInfo = true;
	}

	ngOnInit() {
	}
	ngOnChanges(changes: SimpleChanges) {
		const businessId: SimpleChange = changes.businessId;
		if (businessId.currentValue != null) {
			this.api.getBussinesDetails(businessId.currentValue)
					.subscribe(result => this.business = result);
		}
	}
	public onCloseClick() {
		this.modalDetailInfo = false;
	}
}
