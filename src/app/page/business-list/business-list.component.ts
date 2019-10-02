import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition, query, animateChild } from '@angular/animations';

import { ApiServicesService } from '@service/api-services.service';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'office-list-business-list',
	templateUrl: './business-list.component.html',
	styleUrls: ['./business-list.component.scss'],
	animations: [
		trigger('ngIfAnimation', [
			transition(':enter, :leave', [
				query('@*', animateChild())
			])
		]),
		trigger('easeInOut', [
			transition('void => *', [
				style({
					opacity: 0
				}),
				animate("500ms ease-in", style({
					opacity: 1
				}))
			]),
			transition('* => void', [
				style({
					opacity: 1
				}),
				animate("500ms ease-in", style({
					opacity: 0
				}))
			])
		])
	]
})
export class BusinessListComponent implements OnInit {
	bussinesCenter;
	cardActive = true;
	mapActive = false;
	filterActive = false;
	areas;
	originalData;
	bussinesCenterCount;
	city;
	state;

	public detailOfficeInfo: boolean = false;
	public officeInfo: any = 'Show';

	constructor(private api: ApiServicesService, private route: ActivatedRoute) { }

	ngOnInit() {
		this.route.params.subscribe(params => {
			this.city = this.capitalizeWords(params['city']);
			this.state = this.capitalizeWords(params['state']);
			this.api.getBussinesList(params['country'], params['state'], params['city'], params['zip_code']).subscribe(result => {
				this.bussinesCenter = result;
				this.bussinesCenterCount = Object.keys(this.bussinesCenter).length;
				this.originalData = result;
				this.areas = this.bussinesCenter.reduce((a, d) => {
					if (a.indexOf(d.area_name) === -1) {
						a.push(d.area_name);
					}

					return a;
				}, []);
			});
		});
	}

	showModalDetail() {
		this.detailOfficeInfo = !this.detailOfficeInfo;
		this.officeInfo = (this.detailOfficeInfo) ? 'Show' : 'Hide';
	}

	filterArea(area) {
		if (area !== '') {
			this.bussinesCenter = this.originalData.filter((item) => {
				return item.area_name === area;
			});
		} else {
			this.bussinesCenter = this.originalData;
		}

		this.bussinesCenterCount = Object.keys(this.bussinesCenter).length;
	}

	capitalizeWords(str) {
		const max = 2;

		return str.split('-').map((val) => {
			return val.replace(/\w\S*/g, (txt) => {
				return (txt.length <= max) ? txt : txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
			});
		}).join(' ');
	}

	toogleCard() {
		this.cardActive = !this.cardActive;
	}

	toogleMap() {
		this.mapActive = !this.mapActive;
	}

	toogleFilter() {
		this.filterActive = !this.filterActive;
	}

}
