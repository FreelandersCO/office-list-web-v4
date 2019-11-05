import { Component, OnChanges, Input, SimpleChanges, SimpleChange } from '@angular/core';

@Component({
	selector: 'office-list-map-card',
	templateUrl: './map-card.component.html',
	styleUrls: ['./map-card.component.scss']
})
export class MapCardComponent implements OnChanges {
	@Input() businessInfo;
	business;
	constructor() { }

	ngOnChanges(changes: SimpleChanges) {
		const businessInfo: SimpleChange = changes.businessInfo;
		if (businessInfo.currentValue != null) {

			this.business = businessInfo.currentValue;
			console.log(this.business);
			/*this.api.getBussinesDetails(businessId.currentValue)
					.subscribe(result => this.business = result);*/
		}
	}

}
