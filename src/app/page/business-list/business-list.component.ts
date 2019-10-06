import { Component, OnInit } from '@angular/core';
import { trigger,state,style,animate,transition,query,animateChild } from '@angular/animations';

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
				height: 0,
				opacity: 0
			  }),
			  animate("500ms ease-in", style({
				height: 100,
				opacity: 1
			  }))
		  ]),
		  transition('* => void', [
			  style({
				height: 100,
				opacity: 1
			  }),
			  animate("500ms ease-in", style({
				height: 0,
				opacity: 0	
			  }))
			])
		  ])
	  ]
})
export class BusinessListComponent implements OnInit {
    bussinesCenter;
    areas;
    originalData;
    bussinesCenterCount;
    city;
	state;
	
	public detailOfficeInfo:boolean = false;
	public officeInfo:any = 'Show';
	public priceListOffice:boolean = false;
	public pricesListShow:any = 'Show';
	public filterArea:boolean = false;
	public areaFilterShow:any = 'Show';
	public filterDistance:boolean = false;
	public distanceFilterShow:any = 'Show';
	public filterCalendar:boolean = false;
	public calendarFilterShow:any = 'Show';
	public allFilters:boolean = false;
	public allTheFiltersShow:any = 'Show';

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
	
		if(this.detailOfficeInfo)  
		  this.officeInfo = "Show";
		else
		  this.officeInfo = "Hide";
	}

	showPriceListOffice() {
		this.priceListOffice = !this.priceListOffice;
	
		if(this.priceListOffice)  
		  this.pricesListShow = "Hide";
		else
		  this.pricesListShow = "Show";
	} 

	showFilters() {
        this.allFilters = !this.allFilters;
	
		if(this.allFilters)  
		  this.allTheFiltersShow = "Hide";
		else
		  this.allTheFiltersShow = "Show";
	}

    showFilterArea() {
        this.filterArea = !this.filterArea;
	
		if(this.filterArea)  
		  this.areaFilterShow = "Hide";
		else
		  this.areaFilterShow = "Show";
	}
	
	showFilterDistance() {
        this.filterDistance = !this.filterDistance;
	
		if(this.filterDistance)  
		  this.distanceFilterShow = "Hide";
		else
		  this.distanceFilterShow = "Show";
	}
	
	showFilterCalendar() {
        this.filterCalendar = !this.filterCalendar;
	
		if(this.filterCalendar)  
		  this.calendarFilterShow = "Hide";
		else
		  this.calendarFilterShow = "Show";
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
