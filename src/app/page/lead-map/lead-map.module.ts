import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeadMapRoutingModule } from './lead-map-routing.module';
import { LeadMapComponent } from './lead-map.component';
import { AgmCoreModule } from '@agm/core';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';

@NgModule({
	declarations: [
		LeadMapComponent
	],
	imports: [
		CommonModule,
		LeadMapRoutingModule,
		AgmSnazzyInfoWindowModule,
		AgmJsMarkerClustererModule,
		AgmCoreModule.forRoot({
			apiKey: 'AIzaSyCop_zSgXsfr2eS48LTbflHNRx5N3Un3co'
		})
	]
})
export class LeadMapModule { }
