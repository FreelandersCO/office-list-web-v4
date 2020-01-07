import { Component, OnInit, Input } from '@angular/core';
import { LocalStorageService, ServiceStorageService } from '@app/services/storage.service';
import { ApiServicesService } from '@app/services/api-services.service';
import { EventEmitterService } from '@app/services/event-emitter.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
	selector: 'office-list-bc-card',
	templateUrl: './bc-card.component.html',
	styleUrls: ['./bc-card.component.scss']
})
export class BcCardComponent implements OnInit {
	@Input() bc;
	@Input() myList = false;
	@Input() grid = false;
	@Input() isDesktop = true;
	@Input() isList = false;
	@Input() isIP = false;
	submitted = false;
	tourForm: FormGroup;
	todayDate: Date = new Date();

	public selectedBusiness;
	public detailOfficeInfo = false;

	constructor(
		private localStorageService: LocalStorageService,
		private api: ApiServicesService,
		private eventEmitter: EventEmitterService,
		private formBuilder: FormBuilder,
		private storage: ServiceStorageService
	) {
	}

	ngOnInit() {
		this.tourForm = this.formBuilder.group({
			tourDate: ['', { validators: [Validators.required], updateOn: 'blur' }],
			tourTime: ['', { validators: [Validators.required], updateOn: 'blur' }]
		});

		if (this.eventEmitter.subsVar === undefined) {
			this.eventEmitter.toogleDetails.subscribe((name: string) => {
				this.detailOfficeInfo = false;
			});
			this.eventEmitter.toogleTour.subscribe((name: string) => {
				this.detailOfficeInfo = !this.detailOfficeInfo;
				this.callTour(name);
			});
		}
	}

	async callSingUp(bcId) {// Read the existing
		const bcFavorites = await this.localStorageService.getItem('bc_favorites');
		const obj = bcFavorites.find(o => o === bcId);
		if (obj === undefined) {
			bcFavorites.push(bcId);
			await this.localStorageService.setItem('bc_favorites', bcFavorites);
		}

		this.eventEmitter.favoriteEmitter();
		this.eventEmitter.toogleSingUpEmitter();
	}
	showModalDetail(businessInfo) {
		this.selectedBusiness = businessInfo;
		this.detailOfficeInfo = !this.detailOfficeInfo;
	}
	getNotes(bc) {
		bc.isNote = !bc.isNote;
		if (bc.isNote) {
			this.api.getBCNote(
				bc.buscenter_id
			).subscribe(result => {
				bc.note = result;
			});
		}
	}
	callTour(bcId) {
		this.eventEmitter.toogleTourHeaderEmitter(bcId);
	}
	showInMap(bcId) {
		this.eventEmitter.showInMap(bcId);
	}

	//Book tour

	disableWeekend(d: Date) {
		if (d.getDay() !== 0 && d.getDay() !== 6) {
			return d;
		}
	}
	// convenience getter for easy access to form fields
	get f() { return this.tourForm.controls; }

	async bookTour(bcId) {
		this.submitted = true;
		// stop here if form is invalid
		if (this.tourForm.invalid) {
			return;
		}
		const clientId = await this.storage.getItem('ol_cl');
		let date = this.tourForm.value.tourDate;
		const hour = this.tourForm.value.tourTime.split(':');
		date.setHours(hour[0], hour[1], hour[2]);
		date = date.toISOString().slice(0, 19).replace('T', ' ');

		this.tourForm.value.tour_date = date.toString().slice(0, 19).replace('T', ' ');
		this.tourForm.value.bc_id = bcId;
		this.tourForm.value.client_id = clientId;
		delete this.tourForm.value.tourDate;
		delete this.tourForm.value.tourTime;
		// console.log(this.tourForm.value);
		const token = await this.storage.getItem('ol_tk');
		this.api.setBookTour(this.tourForm.value, token).subscribe(r => this.processResult(r));
	}

	processResult(r){
		if (r) {
			window.location.reload();
		}

	}
}
