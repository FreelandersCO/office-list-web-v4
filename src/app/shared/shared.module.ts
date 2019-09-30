import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';
import { AgmCoreModule } from '@agm/core';

import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { StorageServiceModule } from 'ngx-webstorage-service';

import { SearchInputComponent } from './search-input/search-input.component';
import { BcSliderComponent } from './bc-slider/bc-slider.component';
import { MapComponent } from './map/map.component';
import { BcCardComponent } from './bc-card/bc-card.component';
import { BannerHomeComponent } from './banner-home/banner-home.component';

@NgModule({
    imports: [
        CommonModule,
        AgmCoreModule.forRoot({
            // please get your own API key here:
            // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en
            apiKey: 'AIzaSyCop_zSgXsfr2eS48LTbflHNRx5N3Un3co'
        }),
        AgmJsMarkerClustererModule,
        AutocompleteLibModule,
        StorageServiceModule
    ],
    declarations: [
        SearchInputComponent,
        BcSliderComponent,
        MapComponent,
        BcCardComponent,
        BannerHomeComponent
    ],
    exports: [
        SearchInputComponent,
        BcSliderComponent,
        MapComponent,
        BcCardComponent,
        BannerHomeComponent
    ]
})
export class SharedModule { }
