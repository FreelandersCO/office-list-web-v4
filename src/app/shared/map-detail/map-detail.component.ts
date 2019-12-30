import { Component, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';

@Component({
	selector: 'office-list-map-detail',
	templateUrl: './map-detail.component.html',
	styleUrls: ['./map-detail.component.scss']
})
export class MapDetailComponent implements OnChanges {
	@Input() lat;
	@Input() lng;
	latitude;
	longitude;
	constructor() { }

	ngOnChanges(changes: SimpleChanges) {
		const lat: SimpleChange = changes.lat;
		const lng: SimpleChange = changes.lng;
		if (lng.currentValue != null && !lat.currentValue != null) {
			this.latitude = parseFloat(lat.currentValue);
			this.longitude = parseFloat(lng.currentValue);
		}
	}
}
