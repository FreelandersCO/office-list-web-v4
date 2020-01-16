import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ServiceStorageService } from '@app/services/storage.service';
import { ApiServicesService } from '@app/services/api-services.service';

@Component({
	selector: 'office-list-form-request-single-tour',
	templateUrl: './form-request-single-tour.component.html',
	styleUrls: ['./form-request-single-tour.component.scss']
})
export class FormRequestSingleTourComponent implements OnInit {
	@Input() bc;
	submitted = false;
	tourForm: FormGroup;
	todayDate: Date = new Date();


	constructor(
		private formBuilder: FormBuilder,
		private storage: ServiceStorageService,
		private api: ApiServicesService
	) { }

	ngOnInit() {
		this.tourForm = this.formBuilder.group({
			tourDate: ['', { validators: [Validators.required], updateOn: 'blur' }],
			tourTime: ['', { validators: [Validators.required], updateOn: 'blur' }]
		});
		const weekInMilliseconds = 7 * 24 * 60 * 60 * 1000;
		this.todayDate.setTime(this.todayDate.getTime() + weekInMilliseconds);
	}
	// Book tour

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
		const date = this.tourForm.value.tourDate;
		const hour = this.tourForm.value.tourTime.split(':');
		date.setHours(hour[0], hour[1], hour[2]);
		this.tourForm.value.tour_date = date;
		this.tourForm.value.bc_id = bcId;
		this.tourForm.value.client_id = clientId;
		delete this.tourForm.value.tourDate;
		delete this.tourForm.value.tourTime;
		const token = await this.storage.getItem('ol_tk');
		this.api.setBookTour(this.tourForm.value, token).subscribe(r => this.processResult(r));
	}

	processResult(r) {
		if (r) {
			window.location.reload();
		}

	}

}
