import { Component, OnInit, Input, SimpleChanges, SimpleChange, OnChanges } from '@angular/core';
import { ApiServicesService } from '@service/api-services.service';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
	selector: 'office-list-map',
	templateUrl: './map.component.html',
	styleUrls: ['./map.component.scss']
})

export class MapComponent implements OnInit, OnChanges {
	@Input() bussinesCenter;
	markersList;
	selectBussines;
	openMarket = false;

	constructor(
		private api: ApiServicesService,
		private route: ActivatedRoute,
		private spinner: NgxSpinnerService) { }
	// google maps zoom level
	zoom = 11;
	fullScreen = false;
	// initial center position for the map
	lat;
	lng;
	coordinates;

	ngOnInit() {
		this.route.params.subscribe(params => {
			this.api.getMapBC(params['country'], params['state'], params['city']).subscribe(result =>
				this.setBcs(result)
			);
		});
	}

	ngOnChanges(changes: SimpleChanges) {
		const bussinesCenter: SimpleChange = changes.bussinesCenter;
		if (bussinesCenter.currentValue !== undefined) {
			this.markersList = bussinesCenter.currentValue;
		}
	}

	setInitialPoint(data) {
		if (!(data.length > 0)) {
			return false;
		}

		const numCoords = data.length;

		let X = 0.0;
		let Y = 0.0;
		let Z = 0.0;

		for (let i = 0; i < numCoords; i++) {
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

	setBcs(bussinesCenters) {
		this.setInitialPoint(bussinesCenters);
		this.markersList = bussinesCenters;
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
