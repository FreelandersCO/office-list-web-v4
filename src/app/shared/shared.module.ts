import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';
import { AgmCoreModule } from '@agm/core';

import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { StorageServiceModule } from 'ngx-webstorage-service';

import { SearchInputComponent } from './search-input/search-input.component';
import { BcSliderComponent } from './bc-slider/bc-slider.component';
import { MapComponent } from './map/map.component';
import { BannerHomeComponent } from './banner-home/banner-home.component';
import { ModalDetailComponent } from './modal-detail/modal-detail.component';
import { SvglikeheartComponent } from './svglikeheart/svglikeheart.component';
import { CallUsComponent } from './call-us/call-us.component';
import { GalleryDetailOfficeComponent } from './gallery-detail-office/gallery-detail-office.component';
import { FormInquireNowComponent } from './form-inquire-now/form-inquire-now.component';
import { MapDetailComponent } from './map-detail/map-detail.component';
import { ModalLoginSearchComponent } from './modal-login-search/modal-login-search.component';
import { ModalSingupComponent } from './modal-singup/modal-singup.component';
import { ModalPressedFormComponent } from './modal-pressed-form/modal-pressed-form.component';
import { ModalScheduledTourComponent } from './modal-scheduled-tour/modal-scheduled-tour.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
		StorageServiceModule,
		FormsModule,
		ReactiveFormsModule
	],
	declarations: [
		SearchInputComponent,
		BcSliderComponent,
		MapComponent,
		BannerHomeComponent,
		ModalDetailComponent,
		SvglikeheartComponent,
		CallUsComponent,
		GalleryDetailOfficeComponent,
		FormInquireNowComponent,
		MapDetailComponent,
		ModalLoginSearchComponent,
		ModalSingupComponent,
		ModalPressedFormComponent,
		ModalScheduledTourComponent
	],
	exports: [
		SearchInputComponent,
		BcSliderComponent,
		MapComponent,
		BannerHomeComponent,
		ModalDetailComponent,
		SvglikeheartComponent,
		FormInquireNowComponent,
		GalleryDetailOfficeComponent,
		MapDetailComponent,
		ModalLoginSearchComponent,
		ModalSingupComponent,
		ModalPressedFormComponent,
		ModalScheduledTourComponent
	]
})
export class SharedModule { }
