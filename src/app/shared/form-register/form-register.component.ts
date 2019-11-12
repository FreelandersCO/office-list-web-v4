import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AnimationOptions } from 'ngx-lottie';

import { ApiServicesService } from '@app/services/api-services.service';
import { EventEmitterService } from '@app/services/event-emitter.service';
import { LocalStorageService } from '@app/services/local-storage.service';

@Component({
	selector: 'office-list-form-register',
	templateUrl: './form-register.component.html',
	styleUrls: ['./form-register.component.scss']
})
export class FormRegisterComponent implements OnInit {
	@Input() inquired = false;
	@Input() amId;
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
	constructor(private api: ApiServicesService, private formBuilder: FormBuilder, private localStorageService: LocalStorageService) { }

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

	onSubmit() {
		this.submitted = true;
		this.registerForm.value.amId = this.amId;
		this.registerForm.value.bc_list = this.bcFavorites.join(',');
		// stop here if form is invalid
		if (this.registerForm.invalid) {
			return;
		}
		this.api.setRegistry(this.registerForm.value).subscribe(r => this.processResult(r));
		// display form values on success
	}

	processResult(r) {
		if (r.result) {
			this.successfully = true;
			this.error = false;
		} else {
			this.successfully = false;
			this.error = true;
		}
		this.onReset();
	}
	onReset() {
		this.registerForm.reset();
	}

}
