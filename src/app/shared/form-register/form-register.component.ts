import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AnimationOptions } from 'ngx-lottie';

import { ApiServicesService } from '@app/services/api-services.service';
import { LocalStorageService } from '@app/services/storage.service';
import { EventEmitterService } from '@app/services/event-emitter.service';

@Component({
	selector: 'office-list-form-register',
	templateUrl: './form-register.component.html',
	styleUrls: ['./form-register.component.scss']
})
export class FormRegisterComponent implements OnInit {
	@Input() inquired = false;
	@Input() amId = '';
	@Input() bcId = 0;
	bcFavorites;
	registerForm: FormGroup;
	submitted = false;
	successfully = false;
	error = false;
	optionSuccess: AnimationOptions = {
		path: 'assets/animations/check-animation.json'
	};
	optionError: AnimationOptions = {
		path: 'assets/animations/error.json'
	};
	constructor(
		private api: ApiServicesService,
		private formBuilder: FormBuilder,
		private localStorageService: LocalStorageService,
		private eventEmitter: EventEmitterService) { }

	async ngOnInit() {
		this.registerForm = this.formBuilder.group({
			fullName: ['', Validators.required],
			company: ['', Validators.required],
			email: ['', [Validators.required, Validators.email]],
			phone: ['', [Validators.required]],
			comments: [''],
			amId: [''],
		});
		this.bcFavorites = await this.localStorageService.getItem('bc_favorites');
	}
	// convenience getter for easy access to form fields
	get f() { return this.registerForm.controls; }

	async onSubmit() {
		this.submitted = true;
		if (this.inquired) {
			// Read the existing
			this.bcFavorites.push(this.bcId);
			await this.localStorageService.setItem('bc_favorites', this.bcFavorites);
			this.eventEmitter.favoriteEmitter();
			this.registerForm.value.bc_list = this.bcFavorites.join(',');
		}
		this.registerForm.value.am_id = this.amId === '' ? 0 : this.amId;
		// stop here if form is invalid
		if (this.registerForm.invalid) {
			return;
		}
		this.api.setRegistry(this.registerForm.value).subscribe(r => this.processResult(r));
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
		this.registerForm.reset();
	}

	callRequest() {

	}

}
