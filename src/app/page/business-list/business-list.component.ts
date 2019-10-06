import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition, query, animateChild } from '@angular/animations';

import { ApiServicesService } from '@service/api-services.service';
import { ActivatedRoute } from '@angular/router';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';

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
				height: 0,
				opacity: 0
			  }),
			  animate('500ms ease-in', style({
				height: 100,
				opacity: 1
			  }))
		  ]),
		  transition('* => void', [
			  style({
				height: 100,
				opacity: 1
			  }),
			  animate('500ms ease-in', style({
				height: 0,
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

	public detailOfficeInfo = false;
	public officeInfo: any = 'Show';
	public priceListOffice = false;
	public pricesListShow: any = 'Show';
	public filterArea = false;
	public areaFilterShow: any = 'Show';
	public filterDistance = false;
	public distanceFilterShow: any = 'Show';
	public filterCalendar = false;
	public calendarFilterShow: any = 'Show';
	public allFilters = false;
	public allTheFiltersShow: any = 'Show';

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

	showPriceListOffice() {
		this.priceListOffice = !this.priceListOffice;
		this.pricesListShow = this.priceListOffice ? 'Hide' : 'Show';
	}

	showFilters() {
        this.allFilters = !this.allFilters;
        this.allTheFiltersShow = this.allFilters ? 'Hide' : 'Show';
	}

    showFilterArea() {
        this.filterArea = !this.filterArea;
        this.areaFilterShow  = this.filterArea ? 'Hide' : 'Show';
	}

	showFilterDistance() {
        this.filterDistance = !this.filterDistance;
        this.distanceFilterShow = this.filterDistance ? 'Hide' : 'Show';
	}

	showFilterCalendar() {
        this.filterCalendar = !this.filterCalendar;
        this.calendarFilterShow = this.filterCalendar ? 'Hide' : 'Show';
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
	capitalizeWords(str) {
		const max = 2;

		return str.split('-').map((val) => {
			return val.replace(/\w\S*/g, (txt) => {
				return (txt.length <= max) ? txt : txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
			});
		}).join(' ');
	}

}
