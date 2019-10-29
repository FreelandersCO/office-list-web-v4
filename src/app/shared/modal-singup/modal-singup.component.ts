import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiServicesService } from '@app/services/api-services.service';
import { EventEmitterService } from '@app/services/event-emitter.service';


@Component({
	selector: 'office-list-modal-singup',
	templateUrl: './modal-singup.component.html',
	styleUrls: ['./modal-singup.component.scss']
})
export class ModalSingupComponent implements OnInit {
	registerForm: FormGroup;
	submitted = false;
	constructor(private api: ApiServicesService, private formBuilder: FormBuilder, private eventEmitter: EventEmitterService) { }

	ngOnInit() {
		this.registerForm = this.formBuilder.group({
			where: ['', Validators.required],
			fullName: ['', Validators.required],
			company: ['', Validators.required],
			email: ['', [Validators.required, Validators.email]],
			phoneNumber: ['', [Validators.required]],
			comments: ['', [Validators.required, Validators.minLength(6)]]
		});
	}
	// convenience getter for easy access to form fields
	get f() { return this.registerForm.controls; }

	onSubmit() {
		this.submitted = true;

		// stop here if form is invalid
		if (this.registerForm.invalid) {
			return;
		}
		this.api.setRegistry(this.registerForm.value).subscribe(r => this.onReset());
		// display form values on success
	}

	onReset() {
		this.submitted = false;
		this.registerForm.reset();
	}

	closeSingUp() {
		this.eventEmitter.toogleSingUpEmitter();
	}

	callLogin() {
		this.eventEmitter.toogleLoginEmitter();
	}
}
