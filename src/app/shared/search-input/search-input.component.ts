import { Component, AfterViewInit, ViewEncapsulation, ViewChild, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';

import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

import { ApiServicesService } from '@service/api-services.service';

@Component({
    selector: 'office-list-search-input',
    templateUrl: './search-input.component.html',
    styleUrls: ['./search-input.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SearchInputComponent implements AfterViewInit, OnInit {
    @ViewChild('auto', { static: false }) auto;
    STORAGE_KEY = 'cities_list';
    keyword = 'name';
    loading = true;
    disable = true;
    data;

    constructor(public router: Router, private api: ApiServicesService, @Inject(LOCAL_STORAGE) private storage: StorageService) { }

    ngAfterViewInit() {

    }
    ngOnInit() {
        const elementList = this.storage.get(this.STORAGE_KEY);
        if (!elementList) {
            this.api.getCityList().subscribe(result => {
                this.data = result;
                this.loading = false;
                this.disable = false;
                this.storage.set(this.STORAGE_KEY, result);
            });
        } else {
            this.data = elementList;
            this.loading = false;
            this.disable = false;
        }

    }

    selectEvent(item) {
        // do something with selected item
        this.router.navigate([item.url]);
    }

    onChangeSearch(val) {
        const long = val.length;
        console.log(long);
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
