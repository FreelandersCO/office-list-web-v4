import { Component, OnInit } from '@angular/core';
import { ApiServicesService } from '@app/services/api-services.service';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'office-list-lead-map',
	templateUrl: './lead-map.component.html',
	styleUrls: ['./lead-map.component.scss']
})
export class LeadMapComponent implements OnInit {
	info;
	coordinates = [];
	zoom = 13;
	lat;
	lng;
	business;
	constructor(private api: ApiServicesService, private route: ActivatedRoute) { }

	ngOnInit() {
		this.route.params.subscribe(params => {
			this.api.getMapLead(params['leadId']).subscribe(result => this.procesData(result));
		});
	}

	procesData(r) {
		r.map(item => {
			const point = {
				buscenter_id: item.buscenter_id,
				latitude: item.latitude,
				longitude: item.longitude,
				selected: true
			};
			this.coordinates.push(point);
			if (item.nearby.length > 0) {
				item.nearby.map(itemNeaby => {
					const pointNearby = {
						buscenter_id: itemNeaby.buscenter_id,
						latitude: itemNeaby.latitude,
						longitude: itemNeaby.longitude,
						selected: false
					};
					this.coordinates.push(pointNearby);
				});
			}
		});

		this.setInitialPoint();
	}

	setInitialPoint() {
		const data = this.coordinates;
		const numCoords = data.length;
		let X = 0.0;
		let Y = 0.0;
		let Z = 0.0;
		let i = 0;

		for (i; i < numCoords; i++) {
			// tslint:disable-next-line: no-shadowed-variable

			if (data[i].latitude !== 0 && data[i].longitude !== 0) {
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

	clickedMarker(bdId) {
		this.api.getBussinesDetails(bdId).subscribe(res => {
			this.procesDataMap(res);

		});
	}

	procesDataMap(res) {
		this.business = res.businesCentersInfo;
	}
}
