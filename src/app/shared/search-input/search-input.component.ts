import { Component, ViewEncapsulation, ViewChild, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

import { ApiServicesService } from '@service/api-services.service';
// tslint:disable-next-line: import-blacklist
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
	selector: 'office-list-search-input',
	templateUrl: './search-input.component.html',
	styleUrls: ['./search-input.component.scss']
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

	constructor(public router: Router, private api: ApiServicesService, @Inject(LOCAL_STORAGE) private storage: StorageService) { }

	ngOnInit() {
		const elementList = this.storage.get(this.STORAGE_KEY);
		if (!elementList) {
			this.api.getCityList().subscribe(result => {
				this.optionsObj = result;
				this.options = result;
				this.loading = false;
				this.disable = false;
				this.storage.set(this.STORAGE_KEY, result);
			});
		} else {
			this.optionsObj = elementList;
			this.options = this.optionsObj.map(item => item.name);
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
		const filterValue = item.toLowerCase();
		const selectdObj = this.optionsObj.filter(option => option.name.toLowerCase().includes(filterValue));

		// do something with selected item
		this.router.navigate([selectdObj[0].url]);
	}

	onChangeSearch(val) {
		const long = val.length;
		// console.log(long);
		// tslint:disable-next-line: no-magic-numbers
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
