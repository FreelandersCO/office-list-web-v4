import { Component, OnInit } from '@angular/core';

import { ApiServicesService } from '@service/api-services.service';

@Component({
    selector: 'office-list-business-list',
    templateUrl: './business-list.component.html',
    styleUrls: ['./business-list.component.scss']
})
export class BusinessListComponent implements OnInit {
    bussinesCenters;

    constructor(private api: ApiServicesService) { }

    ngOnInit() {
        this.api.getBussinesList().subscribe(result =>
            console.log(result)
        );
    }

}
