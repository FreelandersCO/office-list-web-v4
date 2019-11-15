import { Component, Input, SimpleChanges, SimpleChange, OnChanges } from '@angular/core';
import { ApiServicesService } from '@service/api-services.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
	selector: 'office-list-map',
	templateUrl: './map.component.html',
	styleUrls: ['./map.component.scss']
})

export class MapComponent implements OnChanges {
	@Input() coordinates;
	@Input() bcOver;
	selectBussines;
	openMarket = false;
	_coordinates;
	_bcOver;
	// google maps zoom level
	zoom;
	usePanning = true;
	fullScreen = false;
	// initial center position for the map
	lat;
	lng;

	constructor(
		private api: ApiServicesService,
		private spinner: NgxSpinnerService) { }


	ngOnChanges(changes: SimpleChanges) {
		const coordinates: SimpleChange = changes.coordinates;
		const bcOver: SimpleChange = changes.bcOver;
		if (('coordinates' in changes) && coordinates.currentValue != null && !('bcOver' in changes)) {
			this._coordinates = coordinates.currentValue;
			this.setInitialPoint();
		}
		if (('bcOver' in changes) && bcOver.currentValue != null) {
			this._bcOver = bcOver.currentValue;
			this.changePoint();
		}

	}

	setInitialPoint() {
		const data = this._coordinates;
		const numCoords = data.length;
		let X = 0.0;
		let Y = 0.0;
		let Z = 0.0;
		let i = 0;

		if (!(numCoords > 0)) {
			return false;
		} else {
			this.zoom = (numCoords > 10) ? 11 : 17;
		}

		for (i; i < numCoords; i++) {
			// tslint:disable-next-line: no-shadowed-variable
			const lat = data[i].latitude * Math.PI / 180;
			// tslint:disable-next-line: no-shadowed-variable
			const lon = data[i].longitude * Math.PI / 180;

			const a = Math.cos(lat) * Math.cos(lon);
			const b = Math.cos(lat) * Math.sin(lon);
			const c = Math.sin(lat);

			X += a;
			Y += b;
			Z += c;
		}

		X /= numCoords;
		Y /= numCoords;
		Z /= numCoords;

		const lon = Math.atan2(Y, X);
		const hyp = Math.sqrt(X * X + Y * Y);
		const lat = Math.atan2(Z, hyp);

		this.lat = (lat * 180 / Math.PI);
		this.lng = (lon * 180 / Math.PI);
	}

	changePoint() {
		const found = this._coordinates.findIndex(element => element.buscenter_id === this._bcOver);
		this._coordinates.map(i => i.over = false);
		this._coordinates[found].over = true;
		this.lat = this._coordinates[found].latitude;
		this.lng = this._coordinates[found].longitude;
		this.zoom = 18;
	}
	clickedMarker(bdId) {
		this.openMarket = true;
		this.spinner.show('loadingMap');
		this.api.getBussinesDetails(bdId).subscribe(res => {
			this.selectBussines = res;
			this.spinner.hide('loadingMap');
		});
	}
	closeMarker() {
		this.openMarket = false;
		this.selectBussines = null;
	}
}
