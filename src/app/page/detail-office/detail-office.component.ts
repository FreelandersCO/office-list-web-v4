import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';
import { SwiperOptions } from 'swiper';
import { ActivatedRoute } from '@angular/router';

import { ApiServicesService } from '@app/services/api-services.service';

@Component({
	selector: 'office-list-detail-office',
	templateUrl: './detail-office.component.html',
	styleUrls: ['./detail-office.component.scss']
})
export class DetailOfficeComponent implements OnInit {
	office = 'private';
	config: SwiperOptions = {
		slidesPerView: 1,
		keyboard: true,
		breakpoints: {
			640: {
				slidesPerView: 4,
			}
		},
		pagination: { el: '.swiper-pagination', clickable: true },
		spaceBetween: 50,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		}
	};
	bussinesCenter;
	privateOffice;
	coWorking;
	virtualOffice;
	hotDesk;
	dedicated;
	selectedBusiness;
	accountManager;
	showPrivateOffice = false;
	showCoWorking = false;
	showVirtualOffice = false;
	showHotDesk = false;
	showDedicated = false;
	activePrivate = false;
	activeCoWorking = false;
	activeVirtual = false;
	detailOfficeInfo = false;
	constructor(
		private api: ApiServicesService,
		private route: ActivatedRoute,
		private titleService: Title,
		private spinner: NgxSpinnerService,
		private meta: Meta) { }

	ngOnInit() {
		this.spinner.show();
		this.route.params.subscribe(params => {
			const explote = params['office_name'].split('-');
			const bcId = explote[explote.length - 1];
			this.api.getBussinesDetails(bcId).subscribe(result => this.procesData(result));
		});
	}

	processDataSEO(data) {
		const title = data.metatitle.replace('{{cross_streets}}', this.bussinesCenter.cross_streets);
		const description = data.metadescription.replace('{{cross_streets}}', this.bussinesCenter.cross_streets);
		// SEO
		this.titleService.setTitle(title);
		this.meta.addTag({ name: 'description', description });
	}

	procesData(result) {
		this.bussinesCenter = result.businesCentersInfo;
		this.api.getPageMeta(
			'bc',
			this.bussinesCenter.buscenter_id
		).subscribe(data => this.processDataSEO(data));
		this.accountManager = result.accountManager[0];
		this.accountManager.phone = this.bussinesCenter.number_tel;
		if (this.bussinesCenter.offices) {
			this.processOffice();
		}
		this.spinner.hide();
	}

	processOffice() {
		const offices = this.bussinesCenter.offices;
		const findPrivate = offices.find(o => o.type_office_id === 1);
		const findCoWorking = offices.find(o => o.type_office_id === 2 || o.type_office_id === 3);
		const findHotDesk = offices.find(o => o.type_office_id === 3);
		const findDedicated = offices.find(o => o.type_office_id === 2);
		const findVirtual = offices.find(o => o.type_office_id === 4);

		if (findPrivate !== undefined) {
			this.privateOffice = findPrivate;
			this.showPrivateOffice = true;
		}

		if (findCoWorking !== undefined) {
			this.coWorking = findCoWorking;
			this.showCoWorking = true;

			if (findHotDesk !== undefined) {
				this.hotDesk = findHotDesk;
				this.showHotDesk = true;
			}

			if (findDedicated !== undefined) {
				this.dedicated = findDedicated;
				this.showDedicated = true;
			}
		}

		if (findVirtual !== undefined) {
			this.virtualOffice = findVirtual;
			this.showVirtualOffice = true;
		}
	}

	openPrivate() {
		this.activePrivate = !this.activePrivate;
		this.activeCoWorking = this.activeVirtual = false;
	}

	openCoWorking() {
		this.activeCoWorking = !this.activeCoWorking;
		this.activePrivate = this.activeVirtual = false;
	}

	openVirtual() {
		this.activeVirtual = !this.activeVirtual;
		this.activePrivate = this.activeCoWorking = false;
	}

	showModalDetail(bcId) {
		this.selectedBusiness = bcId;
		this.detailOfficeInfo = !this.detailOfficeInfo;
	}
}
