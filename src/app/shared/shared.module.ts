import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { NgxMaskModule, IConfig } from 'ngx-mask';
import { AgmCoreModule } from '@agm/core';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';
import { StorageServiceModule } from 'ngx-webstorage-service';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';

import { SearchInputComponent } from './search-input/search-input.component';
import { BcSliderComponent } from './bc-slider/bc-slider.component';
import { MapComponent } from './map/map.component';
import { BannerHomeComponent } from './banner-home/banner-home.component';
import { ModalDetailComponent } from './modal-detail/modal-detail.component';
import { CallUsComponent } from './call-us/call-us.component';
import { GalleryDetailOfficeComponent } from './gallery-detail-office/gallery-detail-office.component';
import { FormInquireNowComponent } from './form-inquire-now/form-inquire-now.component';
import { MapDetailComponent } from './map-detail/map-detail.component';
import { ModalLoginSearchComponent } from './modal-login-search/modal-login-search.component';
import { ModalSingupComponent } from './modal-singup/modal-singup.component';
import { ModalPressedFormComponent } from './modal-pressed-form/modal-pressed-form.component';
import { ModalScheduledTourComponent } from './modal-scheduled-tour/modal-scheduled-tour.component';
import { FavoritesHeartComponent } from './favorites-heart/favorites-heart.component';
import { NormalizaeString } from './utils/normalize-string.pipe';
import { LazyLoadImagesModule } from './lazy-load-images/lazy-load-images.module';
import { FormRegisterComponent } from './form-register/form-register.component';
import { MapCardComponent } from './map-card/map-card.component';
import { ButtonsMobileDetailComponent } from './buttons-mobile-detail/buttons-mobile-detail.component';

// Note we need a separate function as it's required
// by the AOT compiler
export function playerFactory() {
	return player;
}

let options: Partial<IConfig> | (() => Partial<IConfig>);

@NgModule({
	imports: [
		CommonModule,
		AgmCoreModule.forRoot({
			// please get your own API key here:
			// https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en
			apiKey: 'AIzaSyCop_zSgXsfr2eS48LTbflHNRx5N3Un3co'
		}),
		LottieModule.forRoot({ player: playerFactory }),
		AgmJsMarkerClustererModule,
		StorageServiceModule,
		FormsModule,
		ReactiveFormsModule,
		LazyLoadImagesModule,
		FormsModule,
		ReactiveFormsModule,
		MatAutocompleteModule,
		MatFormFieldModule,
		MatInputModule,
		AgmSnazzyInfoWindowModule,
		AutocompleteLibModule,
		DeviceDetectorModule.forRoot(),
		NgxSpinnerModule,
		NgxMaskModule.forRoot(options)
	],
	declarations: [
		NormalizaeString,
		SearchInputComponent,
		BcSliderComponent,
		MapComponent,
		BannerHomeComponent,
		ModalDetailComponent,
		FavoritesHeartComponent,
		CallUsComponent,
		GalleryDetailOfficeComponent,
		FormInquireNowComponent,
		MapDetailComponent,
		ModalLoginSearchComponent,
		ModalSingupComponent,
		ModalPressedFormComponent,
		ModalScheduledTourComponent,
		FavoritesHeartComponent,
		FormRegisterComponent,
		MapCardComponent,
		ButtonsMobileDetailComponent
	],
	exports: [
		NormalizaeString,
		SearchInputComponent,
		BcSliderComponent,
		MapComponent,
		BannerHomeComponent,
		ModalDetailComponent,
		FavoritesHeartComponent,
		FormInquireNowComponent,
		GalleryDetailOfficeComponent,
		MapDetailComponent,
		ModalLoginSearchComponent,
		ModalSingupComponent,
		ModalPressedFormComponent,
		ModalScheduledTourComponent,
		ButtonsMobileDetailComponent
	]
})
export class SharedModule { }
