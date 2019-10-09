import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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
	@ViewChild('map', { static: true }) mapRef: ElementRef;
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
	public mapShow = false;
	public listGrid = false;
	bussinesCenter;
    areas;
    originalData;
    bussinesCenterCount;
    city;
    state;

	constructor(private api: ApiServicesService, private route: ActivatedRoute) {
		this.detailOfficeInfo = this.priceListOffice = this.allFilters = this.filterArea = this.filterDistance = this.filterCalendar = false;
		this.officeInfo = this.pricesListShow = this.allTheFiltersShow = this.areaFilterShow = this.distanceFilterShow = this.calendarFilterShow = 'Show';
	}

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
		this.officeInfo = this.detailOfficeInfo ? 'Hide' : 'Show';
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

	toogleGrid() {
		this.listGrid = !this.listGrid;
	}

	filterByArea(area) {
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

	showMap() {
		this.mapShow = !this.mapShow;
	}
}
