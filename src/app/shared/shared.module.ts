import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxMaskModule, IConfig } from 'ngx-mask';
import { AgmCoreModule } from '@agm/core';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';
import { StorageServiceModule } from 'ngx-webstorage-service';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LottieModule } from 'ngx-lottie';
import { LazyLoadImageModule, intersectionObserverPreset } from 'ng-lazyload-image';
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
import { NormalizeString } from './utils/normalize-string.pipe';
import { FormRegisterComponent } from './form-register/form-register.component';
import { MapCardComponent } from './map-card/map-card.component';
import { ButtonsMobileDetailComponent } from './buttons-mobile-detail/buttons-mobile-detail.component';
import { ImageComponentComponent } from './image-component/image-component.component';
import { NormalizePhone } from './utils/normalize-phone.pipe';
import { ButtonsMobileComponent } from './buttons-mobile/buttons-mobile.component';

export function playerFactory() {
	return player;
}

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
	imports: [
		CommonModule,
		AgmCoreModule.forRoot({
			apiKey: 'AIzaSyCop_zSgXsfr2eS48LTbflHNRx5N3Un3co'
		}),
		LottieModule.forRoot({ player: playerFactory }),
		AgmJsMarkerClustererModule,
		StorageServiceModule,
		FormsModule,
		ReactiveFormsModule,
		FormsModule,
		ReactiveFormsModule,
		AgmSnazzyInfoWindowModule,
		AutocompleteLibModule,
		DeviceDetectorModule.forRoot(),
		NgxSpinnerModule,
		NgxMaskModule.forRoot(options),
		LazyLoadImageModule.forRoot({
			preset: intersectionObserverPreset // <-- tell LazyLoadImage that you want to use IntersectionObserver
		})
	],
	declarations: [
		NormalizeString,
		NormalizePhone,
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
		ButtonsMobileDetailComponent,
		ImageComponentComponent,
		ButtonsMobileComponent
	],
	exports: [
		NormalizeString,
		NormalizePhone,
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
		ButtonsMobileDetailComponent,
		ImageComponentComponent,
		ButtonsMobileComponent
	]
})
export class SharedModule { }
