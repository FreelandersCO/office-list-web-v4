import { Component, OnInit } from '@angular/core';

import { ApiServicesService } from '@service/api-services.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'office-list-business-list',
    templateUrl: './business-list.component.html',
    styleUrls: ['./business-list.component.scss']
})
export class BusinessListComponent implements OnInit {
    bussinesCenters;
    areas;
    originalData;
    bussinesCentersCount;
    city;
    state;

    constructor(private api: ApiServicesService, private route: ActivatedRoute) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.city = params['city'];
            this.state = params['state'];
            this.api.getBussinesList(params['country'], params['state'], params['city']).subscribe(result => {
                this.bussinesCenters = result;
                this.bussinesCentersCount = Object.keys(this.bussinesCenters).length;
                this.originalData = result;
                this.areas = this.bussinesCenters.reduce((a, d) => {
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
            this.bussinesCenters = this.originalData.filter((item) => {
                return item.area_name === area;
            });
        } else {
            this.bussinesCenters = this.originalData;
        }

        this.bussinesCentersCount = Object.keys(this.bussinesCenters).length;
    }

}
