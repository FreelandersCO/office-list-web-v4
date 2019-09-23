import { Component, OnInit } from '@angular/core';

import { ApiServicesService } from '@service/api-services.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'office-list-business-list',
    templateUrl: './business-list.component.html',
    styleUrls: ['./business-list.component.scss']
})
export class BusinessListComponent implements OnInit {
    bussinesCenter;
    areas;
    originalData;
    bussinesCenterCount;
    city;
    state;

    constructor(private api: ApiServicesService, private route: ActivatedRoute) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.city = this.capitalizeWords(params['city']);
            this.state = this.capitalizeWords(params['state']);
            this.api.getBussinesList(params['country'], params['state'], params['city'], params['zip_code']).subscribe(result => {
                this.bussinesCenter = result;
                this.bussinesCenterCount = Object.keys(this.bussinesCenter).length;
                this.originalData = result;
                this.areas = this.bussinesCenter.reduce((a, d) => {
                    if (a.indexOf(d.area_name) === -1) {
                        a.push(d.area_name);
                    }

                    return a;
                }, []);
            });
        });
    }

    filterArea(area) {
        if (area !== '') {
            this.bussinesCenter = this.originalData.filter((item) => {
                return item.area_name === area;
            });
        } else {
            this.bussinesCenter = this.originalData;
        }

        this.bussinesCenterCount = Object.keys(this.bussinesCenter).length;
    }

    capitalizeWords(str) {
        const max = 2;

        return str.split('-').map((val) => {
            return val.replace(/\w\S*/g, (txt) => {
                return (txt.length <= max) ? txt : txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            });
        }).join(' ');
    }

}
