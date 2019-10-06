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
			query('@*', animateChild(), { optional: true })
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
	public detailOfficeInfo;
	public priceListOffice;
	public filterDistance;
	public filterCalendar;
	public allFilters;
	public filterArea;
	public officeInfo;
	public pricesListShow;
	public areaFilterShow;
	public distanceFilterShow;
	public calendarFilterShow;
	public allTheFiltersShow;

	constructor(private api: ApiServicesService, private route: ActivatedRoute) {
		this.detailOfficeInfo = this.priceListOffice = this.allFilters = this.filterArea = this.filterDistance = this.filterCalendar = false;
		this.officeInfo = this.pricesListShow = this.allTheFiltersShow = this.areaFilterShow = this.distanceFilterShow = this.calendarFilterShow = 'Show';
	}

	ngOnInit() {

	}

	showModalDetail() {
		this.detailOfficeInfo = !this.detailOfficeInfo;
		this.officeInfo = this.detailOfficeInfo ? 'Hide' : 'Show';
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
		this.areaFilterShow = this.filterArea ? 'Hide' : 'Show';
	}

	showFilterDistance() {
		this.filterDistance = !this.filterDistance;
		this.distanceFilterShow = this.filterDistance ? 'Hide' : 'Show';
	}

	showFilterCalendar() {
		this.filterCalendar = !this.filterCalendar;
		this.calendarFilterShow = this.filterCalendar ? 'Hide' : 'Show';
	}
}
