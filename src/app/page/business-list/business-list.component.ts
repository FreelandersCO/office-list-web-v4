import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiServicesService } from '@service/api-services.service';
import { NormalizeString } from '@app/shared/utils/normalize-string.pipe';
import { ServiceStorageService } from '@app/services/storage.service';

@Component({
	selector: 'office-list-business-list',
	templateUrl: './business-list.component.html',
	styleUrls: ['./business-list.component.scss'],
})
export class BusinessListComponent implements OnInit {
	@ViewChild('bottonTest', { static: false }) bottonTest: ElementRef;
	public filterDistance = false;
	public allFilters = false;
	public filterArea = true;
	public filterNearby = false;
	public officeInfo;
	public mapShow = false;
	public grid = false;
	public isDesktop = false;
	public showClear = false;
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
	cacheAreas;
	noMore = false;
	isIP = false;
	clientId;
	// tslint:disable-next-line: no-any
	public innerWidth: any;
	constructor(
		private api: ApiServicesService,
		private route: ActivatedRoute,
		private router: Router,
		private deviceService: DeviceDetectorService,
		private titleService: Title,
		private meta: Meta,
		private spinner: NgxSpinnerService,
		private normalize: NormalizeString,
		private sessionStorageService: ServiceStorageService
	) {
		this.spinner.show('loadingPage');
	}

	@HostListener('window:scroll')
	onScroll(): void {
		if (!this.noMore) {
			const scrollPosition = window.pageYOffset;
			const elementPosition = this.bottonTest.nativeElement.offsetTop - 1000;
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
					const size = Object.keys(result.businesCenters).length;
					if (size > 0) {
						this.bussinesCenter = this.bussinesCenter.concat(result.businesCenters);
						this.noMore = false;
					} else {
						this.noMore = true;
					}
					setTimeout(() => {
						this.spinner.hide('loadingBC');
					}, 500);
				});
			}
			this.lastScrollTop = scrollPosition <= 0 ? 0 : scrollPosition;
		}
	}

	async ngOnInit() {
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
		});
		this.api.getIP().subscribe(res => {
			this.proccessIP(res);
		});
		// View
		if (this.deviceService.isDesktop()) {
			this.mapShow = true;
			this.isDesktop = true;
			this.grid = false;
		}

		if(this.cacheParams['zip_code']) {
			this.showClear = true;
		}

		this.clientId = await this.sessionStorageService.getItem('ol_cl');
		this.clientId = (typeof this.clientId === 'number') ? this.clientId : null;
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
		this.bussinesCenterCount =
			this.bussinesCenter && this.bussinesCenter[0] && this.bussinesCenter[0].total ?
				this.bussinesCenter[0].total :
				0;
		this.pageInfo.intro = this.pageInfo.intro.replace('{{numOfBc}}', this.bussinesCenterCount);
	}

	processDataFilter(result) {
		this.cacheAreas = result;
		this.areas = result.map(area => area.area_name);
	}

	capitalizeWords(str) {
		return str.split('-').map((val) => {
			return val.replace(/\w\S*/g, (txt) => {
				return (txt.length <= 2) ? txt : txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
			});
		}).join(' ');
	}

	toogleFilterArea() {
		this.filterArea = !this.filterArea;
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
		const areaType = this.cacheAreas.filter(area => area.area_name === this.selectedArea)[0].type;
		if (areaType === 1) {
			const area = this.normalize.normalizeString(this.selectedArea);
			const url = `/office-space-for-rent/${this.cacheParams['country']}/${this.cacheParams['state']}/${this.cacheParams['city']}/${area}`;
			this.router.navigate([url]);
		} else {
			const area = this.normalize.normalizeString(this.selectedArea);
			const url = `/office-space-for-rent/${this.cacheParams['country']}/${this.cacheParams['state']}/${area}`;
			this.router.navigate([url]);
		}
		/**/
	}
	clearArea() {
		const url = `/office-space-for-rent/${this.cacheParams['country']}/${this.cacheParams['state']}/${this.cacheParams['city']}/`;
		this.router.navigate([url]);
	}
	noMoreSelect(item) {
		this.selectedArea = item;
		this.changeSelect();
	}
}
