import { Component, OnInit } from '@angular/core';
import { EventEmitterService } from '@app/services/event-emitter.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiServicesService } from '@app/services/api-services.service';
import { ServiceStorageService } from '@app/services/storage.service';
import { Router } from '@angular/router';

@Component({
	selector: 'office-list-modal-login-search',
	templateUrl: './modal-login-search.component.html',
	styleUrls: ['./modal-login-search.component.scss'],
	providers: [ServiceStorageService]
})
export class ModalLoginSearchComponent implements OnInit {
	loginForm: FormGroup;
	submitted = false;
	successfully = false;
	error = false;
	constructor(
		private api: ApiServicesService,
		private formBuilder: FormBuilder,
		private eventEmitter: EventEmitterService,
		private sessionStorage: ServiceStorageService,
		public router: Router) { }

	ngOnInit() {
		this.loginForm = this.formBuilder.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required, Validators.minLength(3)]],
		});
	}
	// convenience getter for easy access to form fields
	get f() { return this.loginForm.controls; }

	onSubmit() {
		this.submitted = true;

		// stop here if form is invalid
		if (this.loginForm.invalid) {
			return;
		}
		this.api.setLogin(this.loginForm.value).subscribe(r =>
			this.processResult(r)
		);
		// display form values on success
	}

	onReset() {
		this.loginForm.reset();
	}
	processResult(r) {
		this.successfully = false;
		this.error = true;
		if (r.result.token) {
			this.successfully = true;
			this.error = false;
			this.saveToken(r.result);
		}
		this.onReset();

	}
	saveToken(r) {
		this.sessionStorage.setItem('ol_tk', r.token);
		this.sessionStorage.setItem('ol_cl', r.client_id);
		this.closeLogin();
		this.router.navigate(['/my-list/']);
	}
	closeLogin() {
		this.eventEmitter.toogleLoginEmitter();
	}
	callSingUp() {
		this.eventEmitter.toogleSingUpEmitter();
	}
}
