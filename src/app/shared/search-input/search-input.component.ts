import { Component, AfterViewInit, ViewEncapsulation, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ApiServicesService } from '@service/api-services.service';

@Component({
    selector: 'office-list-search-input',
    templateUrl: './search-input.component.html',
    styleUrls: ['./search-input.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SearchInputComponent implements AfterViewInit, OnInit {
    @ViewChild('auto', { static: false }) auto;
    elementList;
    keyword = 'name';
    loading = true;
    disable = true;
    data;

    constructor(public router: Router, private api: ApiServicesService) { }

    ngAfterViewInit() {

    }
    ngOnInit() {
        this.api.getCityList().subscribe(result => {
            this.data = result;
            this.loading = false;
            this.disable = false;
        });
    }

    selectEvent(item) {
        // do something with selected item
        this.router.navigate([item.url]);
    }

    onChangeSearch(val) {
        const long = val.length;
        console.log(long);
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
