import { Component, ViewEncapsulation, ViewChild, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

import { LocalStorageService } from '@app/services/storage.service';
import { ApiServicesService } from '@service/api-services.service';
// tslint:disable-next-line: import-blacklist
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
	selector: 'office-list-search-input',
	templateUrl: './search-input.component.html',
	styleUrls: ['./search-input.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class SearchInputComponent implements OnInit {
	@ViewChild('auto', { static: false }) auto;
	searchControl = new FormControl();

	filteredOptions;
	STORAGE_KEY = 'cities_list';
	keyword = 'name';
	loading = true;
	disable = true;
	options;
	optionsObj;

	constructor(public router: Router, private api: ApiServicesService, private localStorage: LocalStorageService) { }

	async ngOnInit() {
		const elementList = await this.localStorage.getItem(this.STORAGE_KEY);

		if (elementList.length === 0 ) {
			this.api.getCityList().subscribe(result => {
				this.options = result;
				this.loading = false;
				this.disable = false;
				this.localStorage.setItem(this.STORAGE_KEY, result);
			});
		} else {
			this.options = elementList;
			this.loading = false;
			this.disable = false;
		}
		this.filteredOptions = this.searchControl.valueChanges
			.pipe(
				startWith(''),
				map(value => (value !== '') ? this._filter(value) : '')
			);
	}

	private _filter(value): string[] {
		const filterValue = value.toLowerCase();

		return this.options.filter(option => option.toLowerCase().includes(filterValue));
	}
	selectEvent(item) {
		this.router.navigate([item.url]);
		this.auto.clear();
	}

	onChangeSearch(val) {
		const long = val.length;
		if (long >= 3) {
			this.auto.open();
		} else {
			this.auto.close();

		}
	}

	onFocused(e) {
		// do something when input is focused
		e.stopPropagation();
		this.auto.close();
	}

}
