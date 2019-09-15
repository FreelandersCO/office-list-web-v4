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

    constructor(private api: ApiServicesService,
                private route: ActivatedRoute) { }

    ngOnInit() {
        this.route.params.subscribe( params => {
            this.api.getBussinesList(params['country'], params['state'], params['city']).subscribe(result =>
                this.bussinesCenters = result
            );
        });

    }

}
