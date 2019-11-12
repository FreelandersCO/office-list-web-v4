import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
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
	private cacheParams;
	pageInfo;
	bussinesCenter;
	areas;
	originalData;
	bussinesCenterCount;
	city;
	state;
	loadingMore = false;
	lastScrollTop = 0;
	exclude = [];
	distance = 30;

	constructor(
		private api: ApiServicesService,
		private route: ActivatedRoute,
		private deviceService: DeviceDetectorService,
		private eventEmitter: EventEmitterService,
		private titleService: Title,
		private meta: Meta,
		private spinner: NgxSpinnerService
	) {
		this.detailOfficeInfo = this.allFilters = this.filterArea = this.filterDistance = false;
	}

	@HostListener('window:scroll', ['$event'])
	onScroll($event: Event): void {
		const scrollPosition = window.pageYOffset;
		const elementPosition = this.element.nativeElement.offsetTop - 460;
		if (scrollPosition >= elementPosition && scrollPosition > this.lastScrollTop && !this.loadingMore) {
			this.exclude = this.bussinesCenter.map(i => i.buscenter_id);
			this.loadingMore = true;
			this.spinner.show('loadingBC');
			this.api.getBussinesList(
				this.cacheParams['country'],
				this.cacheParams['state'],
				this.cacheParams['city'],
				this.cacheParams['zip_code'],
				this.exclude,
				this.distance
			).subscribe(result => {
				this.loadingMore = false;
				this.bussinesCenter = this.bussinesCenter.concat(result.businesCenters);
				setTimeout(() => {
					this.spinner.hide('loadingBC');
				}, 500);
			});
		}
		this.lastScrollTop = scrollPosition <= 0 ? 0 : scrollPosition;
	}

	ngOnInit() {
		this.spinner.show('loadingPage');
		this.mapShow = this.deviceService.isDesktop();
		this.listGrid = !this.deviceService.isDesktop();
		this.route.params.subscribe(params => {
			this.cacheParams = params;
			this.api.getBussinesList(
				this.cacheParams['country'],
				this.cacheParams['state'],
				this.cacheParams['city'],
				this.cacheParams['zip_code'],
				this.exclude,
				this.distance
			).subscribe(result => this.processData(result));
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
		this.loadingMore = false;
		this.spinner.hide('loadingPage');
		this.bussinesCenter = result.businesCenters;
		this.pageInfo = result.pageInfo;
		// SEO
		this.titleService.setTitle(this.pageInfo.metatitle);
		this.meta.addTag({ name: 'description', content: this.pageInfo.metadescription });
		// City And State

		this.city = this.capitalizeWords(this.cacheParams['city']);
		this.state = this.capitalizeWords(this.cacheParams['state']);
		// Replace Number Of BC
		this.bussinesCenterCount = this.bussinesCenter[0].total;
		this.pageInfo.intro = this.pageInfo.intro.replace('{{numOfBc}}', this.bussinesCenterCount);
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

	hideFilterDistance() {
		this.filterArea = false;

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

	changeDistance(event) {
		this.distance = event.srcElement.value;
		this.spinner.show('loadingPage');
		this.api.getBussinesList(
			this.cacheParams['country'],
			this.cacheParams['state'],
			this.cacheParams['city'],
			this.cacheParams['zip_code'],
			this.exclude,
			this.distance
		).subscribe(result => {
			this.bussinesCenter = result.businesCenters;
			setTimeout(() => {
				this.spinner.hide('loadingPage');
			}, 500);
		});
	}
}
