import { Component, Input, SimpleChanges, SimpleChange, OnChanges, OnInit } from '@angular/core';
import { ApiServicesService } from '@service/api-services.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'office-list-map',
	templateUrl: './map.component.html',
	styleUrls: ['./map.component.scss']
})

export class MapComponent implements OnInit, OnChanges {
	@Input() bcClick;
	distance = 15;
	selectBussines;
	coordinates;
	openMarket = false;
	_bcClick;
	// google maps zoom level
	zoom;
	usePanning = true;
	fullScreen = false;
	// initial center position for the map
	lat;
	lng;

	constructor(
		private api: ApiServicesService,
		private spinner: NgxSpinnerService,
		private route: ActivatedRoute) { }
	ngOnInit(): void {
		this.route.params.subscribe(params => {
			// Map
			this.api.getMapBC(
				params['country'],
				params['state'],
				params['city'],
				params['zip_code'],
				this.distance
			).subscribe(result =>
				this.setInitialPoint(result)
			);
		});

	}
	ngOnChanges(changes: SimpleChanges) {
		const bcClick: SimpleChange = changes.bcClick;
		if (('bcClick' in changes) && bcClick.currentValue != null) {
			this._bcClick = bcClick.currentValue;
			this.changePoint();
		}
	}

	setInitialPoint(coordinates) {
		this.coordinates = coordinates;
		const data = this.coordinates ;
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
		if (this._bcClick !== null) {
			const found = this.coordinates.findIndex(element => element.buscenter_id === this._bcClick);
			this.coordinates.map(i => i.over = false);
			this.coordinates[found].over = true;
			this.lat = this.coordinates[found].latitude;
			this.lng = this.coordinates[found].longitude;
			this.zoom = 17;
		}
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
