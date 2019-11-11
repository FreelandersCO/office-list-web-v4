import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiServicesService } from '@app/services/api-services.service';
import { EventEmitterService } from '@app/services/event-emitter.service';

@Component({
	selector: 'office-list-form-register',
	templateUrl: './form-register.component.html',
	styleUrls: ['./form-register.component.scss']
})
export class FormRegisterComponent implements OnInit {
	@Input() inquired = false;
	@Input() amId;
	registerForm: FormGroup;
	submitted = false;

	constructor(private api: ApiServicesService, private formBuilder: FormBuilder, private eventEmitter: EventEmitterService) { }

	ngOnInit() {
		this.registerForm = this.formBuilder.group({
			fullName: ['', Validators.required],
			company: ['', Validators.required],
			email: ['', [Validators.required, Validators.email]],
			phone: ['', [Validators.required]],
			comments: [''],
			amId: [''],
		});
	}
	// convenience getter for easy access to form fields
	get f() { return this.registerForm.controls; }

	onSubmit() {
		this.submitted = true;
		this.registerForm.value.amId = this.amId;
		console.log(this.registerForm.value);
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

}
