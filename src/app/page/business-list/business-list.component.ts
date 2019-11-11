import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { NgxSpinnerService } from 'ngx-spinner';

import { EventEmitterService } from '@app/services/event-emitter.service';
import { ApiServicesService } from '@service/api-services.service';


@Component({
	selector: 'office-list-business-list',
	templateUrl: './business-list.component.html',
	styleUrls: ['./business-list.component.scss'],
})
export class BusinessListComponent implements OnInit {
	@ViewChild('bottonTest', { static: false }) element: ElementRef;
	public selectedBusiness;
	public detailOfficeInfo = false;
	public filterDistance = false;
	public allFilters = false;
	public filterArea = false;
	public officeInfo;
	public mapShow;
	public listGrid;
	principalBanner;
	bussinesCenter;
	areas;
	originalData;
	bussinesCenterCount;
	city;
	state;
	throttle = 300;
	scrollDistance = 1;
	scrollUpDistance = 2;

	constructor(
		private api: ApiServicesService,
		private route: ActivatedRoute,
		private deviceService: DeviceDetectorService,
		private eventEmitter: EventEmitterService,
		private titleService: Title,
		private spinner: NgxSpinnerService
	) {
		this.detailOfficeInfo = this.allFilters = this.filterArea = this.filterDistance = false;
	}

	ngOnInit() {
		this.spinner.show();
		this.mapShow = this.deviceService.isDesktop();
		this.listGrid = !this.deviceService.isDesktop();
		this.route.params.subscribe(params => {
			this.city = this.capitalizeWords(params['city']);
			this.state = this.capitalizeWords(params['state']);
			const title = `Office Space for Rent ${this.city} :: OfficeList.com`;
			this.titleService.setTitle(title);
			this.api.getBussinesList(params['country'],
				params['state'], params['city'], params['zip_code'])
				.subscribe(result => this.processData(result));
		});
		if (this.eventEmitter.subsVar === undefined) {
			this.eventEmitter.toogleDetails.subscribe((name: string) => {
				this.detailOfficeInfo = !this.detailOfficeInfo;
				this.callSingUp();
			});

			this.eventEmitter.toogleTour.subscribe((name: string) => {
				this.detailOfficeInfo = !this.detailOfficeInfo;
				this.callTour();
			});

		}
	}

	processData(result) {
		this.spinner.hide();
		this.bussinesCenter = result.businesCenters;
		this.principalBanner = result.principalBanner;
	}

	capitalizeWords(str) {
		return str.split('-').map((val) => {
			return val.replace(/\w\S*/g, (txt) => {
				return (txt.length <= 2) ? txt : txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
			});
		}).join(' ');
	}

	showModalDetail(businessInfo) {
		this.selectedBusiness = businessInfo;
		this.detailOfficeInfo = !this.detailOfficeInfo;
	}

	showFilters() {
		this.allFilters = !this.allFilters;
	}

	showFilterArea() {
		this.filterArea = !this.filterArea;
		this.filterDistance = false;
	}

	showFilterDistance() {
		this.filterArea = true;
		this.filterDistance = !this.filterDistance;
	}

	showGrid() {
		this.listGrid = true;
	}

	hideGrid() {
		this.listGrid = false;
	}

	showMap() {
		this.mapShow = !this.mapShow;
	}

	callSingUp() {
		this.eventEmitter.toogleSingUpEmitter();
	}

	callTour() {
		this.eventEmitter.toogleTourHeaderEmitter();
	}
}
