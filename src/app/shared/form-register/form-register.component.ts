import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ApiServicesService } from '@app/services/api-services.service';
import { LocalStorageService, ServiceStorageService } from '@app/services/storage.service';
import { EventEmitterService } from '@app/services/event-emitter.service';
import { Router } from '@angular/router';

@Component({
	selector: 'office-list-form-register',
	templateUrl: './form-register.component.html',
	styleUrls: ['./form-register.component.scss']
})
export class FormRegisterComponent implements OnInit {
	@ViewChild('calendarIcon', { static: true }) calendarIcon;
	@Input() inquired = false;
	@Input() tour = false;
	@Input() amId = '';
	@Input() bcId = 0;
	bcFavorites;
	registerForm: FormGroup;
	submitted = false;
	successfully = false;
	ip;
	error = false;
	todayDate: Date = new Date();
	constructor(
		private api: ApiServicesService,
		private formBuilder: FormBuilder,
		private localStorageService: LocalStorageService,
		private eventEmitter: EventEmitterService,
		private sessionStorage: ServiceStorageService,
		public router: Router) { }

	async ngOnInit() {
		if (this.tour) {
			this.registerForm = this.formBuilder.group({
				tourDate: ['', { validators: [Validators.required], updateOn: 'blur' }],
				tourTime: ['', { validators: [Validators.required], updateOn: 'blur' }],
				fullName: ['', { validators: [Validators.required], updateOn: 'blur' }],
				company: ['', { validators: [Validators.required], updateOn: 'blur' }],
				email: ['', { validators: [Validators.required, Validators.email], updateOn: 'blur' }],
				phone: ['', { validators: [Validators.required], updateOn: 'blur' }],
				comments: ['']
			});
		} else {
			this.registerForm = this.formBuilder.group({
				fullName: ['', { validators: [Validators.required], updateOn: 'blur' }],
				company: ['', { validators: [Validators.required], updateOn: 'blur' }],
				email: ['', { validators: [Validators.required, Validators.email], updateOn: 'blur' }],
				phone: ['', { validators: [Validators.required], updateOn: 'blur' }],
				comments: ['']
			});
		}
		const weekInMilliseconds = 7 * 24 * 60 * 60 * 1000;
		this.todayDate.setTime(this.todayDate.getTime() + weekInMilliseconds);
		this.api.getIP().subscribe(res => {
			this.proccessIP(res);
		});
		this.bcFavorites = await this.localStorageService.getItem('bc_favorites');
	}
	proccessIP(res) {
		this.ip = res.ip;
	}
	// convenience getter for easy access to form fields
	get f() { return this.registerForm.controls; }

	async onSubmit() {
		this.submitted = true;
		// stop here if form is invalid
		if (this.registerForm.invalid) {
			return;
		}

		if (this.inquired) {
			// Read the existing
			this.bcFavorites.push(this.bcId);
			await this.localStorageService.setItem('bc_favorites', this.bcFavorites);
			this.eventEmitter.favoriteEmitter();
			this.registerForm.value.am_id = this.amId === '' ? 0 : this.amId;
		}

		if (this.tour) {
			const date = this.registerForm.value.tourDate;
			const hour = this.registerForm.value.tourTime.split(':');
			date.setHours(hour[0], hour[1], hour[2]);
			this.registerForm.value.date_tour = date;
			this.registerForm.value.tour_bc = this.bcId;
			delete this.registerForm.value.tourDate;
			delete this.registerForm.value.tourTime;
			// Read the existing
			this.bcFavorites.push(this.bcId);
			await this.localStorageService.setItem('bc_favorites', this.bcFavorites);
			this.eventEmitter.favoriteEmitter();
			this.registerForm.value.am_id = this.amId === '' ? 0 : this.amId;
		}

		this.registerForm.value.bc_list = this.bcFavorites.join(',');
		this.registerForm.value.tour = this.tour;
		this.registerForm.value.ip = this.ip;

		this.api.setRegistry(this.registerForm.value).subscribe(r => this.processResult(r));
		// display form values on success
	}

	processResult(r) {
		this.successfully = false;
		this.error = true;
		if (r.result) {

			this.successfully = true;
			this.error = false;
			this.sessionStorage.setItem('ol_tk', r.tok.data.token);
			this.sessionStorage.setItem('ol_cl', r.tok.data.client_id);

			if(this.tour) {
				this.eventEmitter.toogleTourHeaderEmitter(null);
			} else {
				this.eventEmitter.toogleSingUpEmitter();
			}
			window.location.href = '/my-list/';
		}
		this.onReset();
	}

	onReset() {
		this.registerForm.reset();
	}

	disableWeekend(d: Date) {
		if (d.getDay() !== 0 && d.getDay() !== 6) {
			return d;
		}
	}
}
