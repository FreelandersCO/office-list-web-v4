import { Component, Input, SimpleChanges, OnChanges, SimpleChange } from '@angular/core';

@Component({
	selector: 'office-list-form-inquire-now',
	templateUrl: './form-inquire-now.component.html',
	styleUrls: ['./form-inquire-now.component.scss']
})
export class FormInquireNowComponent implements OnChanges {
	@Input() accountManager;
	_accountManager;

	constructor() { }

	ngOnChanges(changes: SimpleChanges): void {
		const accountManager: SimpleChange = changes.accountManager;
		if (accountManager.currentValue != null) {
			this._accountManager = accountManager.currentValue;
			const nameProccess = this._accountManager.name.toLowerCase().replace(' ', '_');
			this._accountManager.image = 'https://www.officelist.com/images/staff/' + nameProccess + '.png';
		}
	}
}
