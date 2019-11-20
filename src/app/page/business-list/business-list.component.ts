import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { NgxSpinnerService } from 'ngx-spinner';

import { EventEmitterService } from '@app/services/event-emitter.service';
import { ApiServicesService } from '@service/api-services.service';
import { LocalStorageService } from '@app/services/storage.service';

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
	public mapShow = false;
	public listGrid = false;
	public isDesktop = false;
	private cacheParams;
	pageInfo;
	bussinesCenter;
	bussinesCenterCache;
	bcClick;
	areas;
	bussinesCenterCount;
	city;
	state;
	loadingMore = false;
	lastScrollTop = 0;
	exclude = [];
	distance = 15;
	selectedAreas;
	isIP = false;

	constructor(
		private api: ApiServicesService,
		private route: ActivatedRoute,
		private deviceService: DeviceDetectorService,
		private eventEmitter: EventEmitterService,
		private titleService: Title,
		private meta: Meta,
		private spinner: NgxSpinnerService,
		private localStorageService: LocalStorageService
	) {
		this.detailOfficeInfo = this.allFilters = this.filterArea = this.filterDistance = false;
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
			// View
			if (this.deviceService.isDesktop()) {
				this.mapShow = true;
				this.isDesktop = true;
			}
			this.api.getIP().subscribe(res => {
				this.proccessIP(res);
			});
		});

		if (this.eventEmitter.subsVar === undefined) {
			this.eventEmitter.toogleDetails.subscribe((name: string) => {
				this.detailOfficeInfo = !this.detailOfficeInfo;
			});
			this.eventEmitter.toogleTour.subscribe((name: string) => {
				this.detailOfficeInfo = !this.detailOfficeInfo;
				this.callTour();
			});

		}
	}
	proccessIP(rest) {
		// tslint:disable-next-line: prefer-switch
		if (rest.ip === '190.25.101.144' ||
			rest.ip === '190.85.131.25' ||
			rest.ip === '186.31.138.169') {
				this.isIP = true;
		}
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
		this.bussinesCenterCount = this.bussinesCenter[0].total;
		this.pageInfo.intro = this.pageInfo.intro.replace('{{numOfBc}}', this.bussinesCenterCount);
	}

	processDataFilter(result) {
		this.areas = result.map(r => r.area_name);
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

	toogleFilterArea() {
		this.filterArea = !this.filterArea;
		this.filterDistance = false;
	}

	toogleFilterDistance() {
		this.filterArea = false;
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

	async callSingUp(bcId) {// Read the existing
		const bcFavorites = await this.localStorageService.getItem('bc_favorites');
		bcFavorites.push(bcId);
		await this.localStorageService.setItem('bc_favorites', bcFavorites);

		this.eventEmitter.favoriteEmitter();
		this.eventEmitter.toogleSingUpEmitter();
	}

	callTour() {
		this.eventEmitter.toogleTourHeaderEmitter();
	}

	showInMap(bussinesCenterId) {
		this.bcClick = bussinesCenterId;
	}

	applyFilterArea() {
		this.spinner.show('loadingPage');
		this.bussinesCenterCache = this.bussinesCenter;
		this.api.filterBc(
			this.cacheParams['country'],
			this.cacheParams['state'],
			this.cacheParams['city'],
			this.cacheParams['zip_code'],
			this.distance,
			this.selectedAreas
		).subscribe(bcFilter => {
			this.bussinesCenter = bcFilter;
			this.filterArea = !this.filterArea;
			this.spinner.hide('loadingPage');

		});
	}
	clearArea() {
		this.selectedAreas = '';
		this.bussinesCenter = this.bussinesCenterCache;
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

	getNotes(bc) {
		bc.isNote = true;
		this.api.getBCNote(
			bc.buscenter_id
		).subscribe(result => {
			bc.note = result;
		});
	}
}
