import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiServicesService } from '@app/services/api-services.service';

@Component({
	selector: 'office-list-form-contact-us',
	templateUrl: './form-contact-us.component.html',
	styleUrls: ['./form-contact-us.component.scss']
})
export class FormContactUsComponent implements OnInit {
	contactForm: FormGroup;
	submitted = false;
	successfully = false;
	ip;
	error = false;
	constructor(
		private api: ApiServicesService,
		private formBuilder: FormBuilder) { }

	ngOnInit() {
		this.contactForm = this.formBuilder.group({
			name: ['', { validators: [Validators.required], updateOn: 'blur' }],
			company: ['', { validators: [Validators.required], updateOn: 'blur' }],
			email: ['', { validators: [Validators.required, Validators.email], updateOn: 'blur' }],
			phone: ['', { validators: [Validators.required], updateOn: 'blur' }],
			comments: ['']
		});
		this.api.getIP().subscribe(res => {
			this.proccessIP(res);
		});
	}

	proccessIP(res) {
		this.ip = res.ip;
	}
	// convenience getter for easy access to form fields
	get f() { return this.contactForm.controls; }

	async onSubmit() {
		this.submitted = true;
		this.contactForm.value.ip = this.ip;
		// stop here if form is invalid
		if (this.contactForm.invalid) {
			return;
		}
		this.api.setContactUs(this.contactForm.value).subscribe(r => this.processResult(r));
		// display form values on success
	}

	processResult(r) {
		this.successfully = false;
		this.error = true;
		if (r.result) {
			this.successfully = true;
			this.error = false;
		}
		this.onReset();
	}

	onReset() {
		this.contactForm.reset();
	}

}
