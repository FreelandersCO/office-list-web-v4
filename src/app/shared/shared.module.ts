import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';
import { AgmCoreModule } from '@agm/core';

import { SearchInputComponent } from './search-input/search-input.component';
import { BcSliderComponent } from './bc-slider/bc-slider.component';
import { MapComponent } from './map/map.component';
import { BcCardComponent } from './bc-card/bc-card.component';
import { ModalDetailComponent } from './modal-detail/modal-detail.component';
import { SvglikeheartComponent } from './svglikeheart/svglikeheart.component'


@NgModule({
    imports: [
        CommonModule,
        AgmCoreModule.forRoot({
          // please get your own API key here:
          // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en
          apiKey: 'AIzaSyCop_zSgXsfr2eS48LTbflHNRx5N3Un3co'
        }),
        AgmJsMarkerClustererModule
    ],
    declarations: [
        SearchInputComponent,
        BcSliderComponent,
        MapComponent,
        BcCardComponent,
		ModalDetailComponent,
		SvglikeheartComponent
    ],
    exports: [
        SearchInputComponent,
        BcSliderComponent,
        MapComponent,
		BcCardComponent,
		ModalDetailComponent,
		SvglikeheartComponent
    ]
})
export class SharedModule { }
