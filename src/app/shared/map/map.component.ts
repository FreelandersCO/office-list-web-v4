import { Component, OnInit, Input, SimpleChanges, SimpleChange, OnChanges } from '@angular/core';
import { ApiServicesService } from '@service/api-services.service';
import { ActivatedRoute } from '@angular/router';

import { StyleData } from './map.style.json';

@Component({
    selector: 'office-list-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss']
})

export class MapComponent implements OnInit, OnChanges {
    // tslint:disable-next-line: ban-types
    @Input() bussinesCenter: Object;
    style = StyleData;
    markersList;
    constructor(private api: ApiServicesService, private route: ActivatedRoute) { }
    // google maps zoom level
    zoom = 10;
    // initial center position for the map
    lat;
    lng;
    coordinates;

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.api.getCoordinates(params['country'], params['state'], params['city']).subscribe(result =>
                this.setInitialPoint(result)
            );
        });
    }

    ngOnChanges(changes: SimpleChanges) {
        const bussinesCenter: SimpleChange = changes.bussinesCenter;
        if (bussinesCenter.currentValue !== undefined) {
            this.markersList = bussinesCenter.currentValue;
        }
    }

    setInitialPoint(point) {
        this.lat = parseFloat(point.latitude);
        this.lng = parseFloat(point.longitude);
    }
}
