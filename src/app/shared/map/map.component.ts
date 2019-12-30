import { Component, OnInit } from '@angular/core';
import { ApiServicesService } from '@service/api-services.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute } from '@angular/router';
import { EventEmitterService } from '@app/services/event-emitter.service';

@Component({
	selector: 'office-list-map',
	templateUrl: './map.component.html',
	styleUrls: ['./map.component.scss']
})

export class MapComponent implements OnInit {
	distance = 30;
	selectBussines;
	coordinates;
	openMarket = false;
	_bcClick;
	// google maps zoom level
	zoom = 1;
	usePanning = true;
	fullScreen = false;
	zip_code;
	// initial center position for the map
	lat;
	lng;

	constructor(
		private api: ApiServicesService,
		private spinner: NgxSpinnerService,
		private route: ActivatedRoute,
		private eventEmitter: EventEmitterService) { }
	ngOnInit(): void {
		this.route.params.subscribe(params => {
			this.zip_code = params['zip_code'];
			// Map
			this.api.getMapBC(
				params['country'],
				params['state'],
				params['city'],
				this.zip_code,
				this.distance
			).subscribe(result =>
				this.setInitialPoint(result)
			);

		});
		if (this.eventEmitter.subsVar === undefined) {
			this.eventEmitter.callShowInMap.subscribe((bcId) => {
				this._bcClick = bcId.bcId;
				this.changePoint();
			});
		}
	}

	// tslint:disable-next-line: cyclomatic-complexity
	setInitialPoint(coordinates) {
		this.coordinates = coordinates;
		const data = this.coordinates;
		const numCoords = data.length;
		let X = 0.0;
		let Y = 0.0;
		let Z = 0.0;
		let i = 0;


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
			if (found >= 0) {
				this.coordinates.map(i => i.over = false);
				this.coordinates[found].over = true;
				this.lat = this.coordinates[found].latitude;
				this.lng = this.coordinates[found].longitude;
				this.zoom = 18;
			}
		}
	}
	clickedMarker(bdId) {
		this.openMarket = true;
		this.spinner.show('loadingMap');
		this.api.getReduceBussinesDetails(bdId).subscribe(res => {
			this.selectBussines = res;
			this.spinner.hide('loadingMap');
		});
	}
	closeMarker() {
		this.openMarket = false;
		this.selectBussines = null;
	}
	restoreMap() {
		const numCoords = this.coordinates.length;
		switch (true) {
			case numCoords > 0 && numCoords < 20:
				this.zoom = 14;
				break;
			case numCoords > 20 && numCoords < 100:
				this.zoom = 13;
				break;
			case numCoords > 100 && numCoords < 200:
				this.zoom = 12;
				break;
			default:
				this.zoom = 12;
				break;
		}
	}
}
