import { Component, OnInit } from '@angular/core';
import { EventEmitterService } from '@app/services/event-emitter.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiServicesService } from '@app/services/api-services.service';

@Component({
	selector: 'office-list-modal-login-search',
	templateUrl: './modal-login-search.component.html',
	styleUrls: ['./modal-login-search.component.scss']
})
export class ModalLoginSearchComponent implements OnInit {
	loginForm: FormGroup;
	submitted = false;
	constructor(private api: ApiServicesService, private formBuilder: FormBuilder, private eventEmitter: EventEmitterService) { }

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
		this.api.setLogin(this.loginForm.value).subscribe(r => this.onReset());
		// display form values on success
	}

	onReset() {
		this.submitted = false;
		this.loginForm.reset();
	}

	closeLogin() {
		this.eventEmitter.toogleLoginEmitter();
	}
	callSingUp() {
		this.eventEmitter.toogleSingUpEmitter();
	}
}
