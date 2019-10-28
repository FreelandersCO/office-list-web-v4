import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'office-list-modal-singup',
	templateUrl: './modal-singup.component.html',
	styleUrls: ['./modal-singup.component.scss']
})
export class ModalSingupComponent implements OnInit {
	registerForm: FormGroup;
	submitted = false;
	constructor(private formBuilder: FormBuilder) { }

	ngOnInit() {
		this.registerForm = this.formBuilder.group({
            where: ['', Validators.required],
            fullName: ['', Validators.required],
            company: ['', Validators.required],
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

        // display form values on success
        alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
    }

}
