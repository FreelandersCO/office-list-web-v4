import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { NgxSpinnerService } from 'ngx-spinner';

import { EventEmitterService } from '@app/services/event-emitter.service';
import { ApiServicesService } from '@service/api-services.service';
import { NormalizeString } from '@app/shared/utils/normalize-string.pipe';

@Component({
	selector: 'office-list-business-list',
	templateUrl: './business-list.component.html',
	styleUrls: ['./business-list.component.scss'],
})
export class BusinessListComponent implements OnInit {
	@ViewChild('bottonTest', { static: false }) element: ElementRef;
	public filterDistance = false;
	public allFilters = false;
	public filterArea = false;
	public filterNearby = false;
	public officeInfo;
	public mapShow = false;
	public grid = false;
	public isDesktop = false;
	private cacheParams;
	pageInfo;
	bussinesCenter;
	bussinesCenterCache;
	areas;
	bussinesCenterCount;
	city;
	state;
	loadingMore = false;
	lastScrollTop = 0;
	exclude = [];
	distance = 30;
	selectedArea;
	selectedNearby;
	nearbyCities;
	isIP = false;

	constructor(
		private api: ApiServicesService,
		private route: ActivatedRoute,
		private router: Router,
		private deviceService: DeviceDetectorService,
		private titleService: Title,
		private meta: Meta,
		private spinner: NgxSpinnerService,
		private normalize: NormalizeString
	) {
		this.allFilters = this.filterArea = this.filterDistance = false;
		this.spinner.show('loadingPage');
	}

	@HostListener('window:scroll', ['$event'])
	onScroll($event: Event): void {
		const scrollPosition = window.pageYOffset;
		const elementPosition = this.element.nativeElement.offsetTop - 1000;
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
		this.route.params.subscribe(params => {
			this.cacheParams = params;
			// List Result
			this.api.getBussinesList(
				this.cacheParams['country'],
				this.cacheParams['state'],
				this.cacheParams['city'],
				this.cacheParams['zip_code'],
				this.exclude,
				this.distance
			).subscribe(result => this.processDataList(result));
			// Filter
			this.api.getAreasFilter(
				this.cacheParams['country'],
				this.cacheParams['state'],
				this.cacheParams['city'],
				this.cacheParams['zip_code'],
				this.distance
			).subscribe(result => this.processDataFilter(result));

			this.api.getNearbyFilter(
				this.cacheParams['country'],
				this.cacheParams['state'],
				this.cacheParams['city'],
				this.distance
			).subscribe(result => this.processDataNearby(result));

			if (this.cacheParams['zip_code'] !== undefined) {
				this.selectedArea = this.capitalizeWords(this.cacheParams['zip_code']);
			}
		});
		this.api.getIP().subscribe(res => {
			this.proccessIP(res);
		});
		// View
		if (this.deviceService.isDesktop()) {
			this.mapShow = true;
			this.isDesktop = true;
			this.grid = true;
		}
	}
	proccessIP(rest) {
		// tslint:disable-next-line: prefer-switch
		if (rest.ip === '190.25.101.144' ||
			rest.ip === '190.85.131.25' ||
			rest.ip === '186.155.68.64') {
			this.isIP = true;
		}
	}

	processDataNearby(result){
		this.nearbyCities = result.filter(item => item.city !== null).map(item => item.city);
	}

	processDataList(result) {
		setTimeout(() => {
			this.spinner.hide('loadingPage');
		}, 200);
		this.loadingMore = false;
		this.bussinesCenter = result.businesCenters;
		this.pageInfo = result.pageInfo;
		// SEO
		this.titleService.setTitle(this.pageInfo.metatitle);
		this.meta.addTag({ name: 'description', content: this.pageInfo.metadescription });
		// City And State
		this.city = this.capitalizeWords(this.cacheParams['city']);
		this.state = this.capitalizeWords(this.cacheParams['state']);
		// Replace Number Of BC
		this.bussinesCenterCount =
			this.bussinesCenter && this.bussinesCenter[0] && this.bussinesCenter[0].total ?
			this.bussinesCenter[0].total :
			0;
		this.pageInfo.intro = this.pageInfo.intro.replace('{{numOfBc}}', this.bussinesCenterCount);
	}

	processDataFilter(result) {
		this.areas = result.filter(area => area.area_name !== null).map(area => area.area_name);
	}

	capitalizeWords(str) {
		return str.split('-').map((val) => {
			return val.replace(/\w\S*/g, (txt) => {
				return (txt.length <= 2) ? txt : txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
			});
		}).join(' ');
	}

	showFilters() {
		this.allFilters = !this.allFilters;
	}

	toogleFilterArea() {
		this.filterArea = !this.filterArea;
		this.filterDistance = this.filterNearby =false;
	}
	toogleFilterNearby(){
		this.filterNearby = !this.filterNearby;
		this.filterDistance = this.filterArea = false;
	}
	toogleFilterDistance() {
		this.filterArea = this.filterNearby  = false;
		this.filterDistance = !this.filterDistance;
	}

	hideFilterDistance() {
		this.filterArea = false;
	}

	showGrid() {
		this.grid = true;
	}

	hideGrid() {
		this.grid = false;
	}

	showMap() {
		this.mapShow = !this.mapShow;
	}
	changeSelect() {
		const area = this.normalize.normalizeString(this.selectedArea);
		const url = `/office-space-for-rent/${this.cacheParams['country']}/${this.cacheParams['state']}/${this.cacheParams['city']}/${area}`;
		this.router.navigate([url]);
	}
	clearArea() {
		const url = `/office-space-for-rent/${this.cacheParams['country']}/${this.cacheParams['state']}/${this.cacheParams['city']}`;
		this.router.navigate([url]);
	}
	changeNearby(){
		const city = this.normalize.normalizeString(this.selectedNearby);
		const url = `/office-space-for-rent/${this.cacheParams['country']}/${this.cacheParams['state']}/${city}`;
		this.router.navigate([url]);
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
				this.filterArea = !this.filterArea;
				this.spinner.hide('loadingPage');
			}, 500);
		});
	}
}
