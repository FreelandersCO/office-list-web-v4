import { Component, Input, SimpleChanges, OnChanges, SimpleChange } from '@angular/core';

@Component({
	selector: 'office-list-form-inquire-now',
	templateUrl: './form-inquire-now.component.html',
	styleUrls: ['./form-inquire-now.component.scss']
})
export class FormInquireNowComponent implements OnChanges {
	@Input() accountManager;
	@Input() bcId;
	@Input() myList = false;
	_accountManager;

	constructor() { }

	ngOnChanges(changes: SimpleChanges): void {
		if(!this.myList) {
			const accountManager: SimpleChange = changes.accountManager;
			if (accountManager.currentValue != null) {
				this._accountManager = accountManager.currentValue;
				const nameProccess = this._accountManager.name.toLowerCase().replace(' ', '_');
				this._accountManager.image = '/assets/images/staff/picture-staff-' + nameProccess + '.png';
			}
		}
	}
}
