import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { ButtonsmobileComponent } from './shared/buttonsmobile/buttonsmobile.component';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
	imports: [
		BrowserAnimationsModule,
		BrowserModule.withServerTransition({ appId: 'serverApp' }),
		HttpClientModule,
		AppRoutingModule,
		SharedModule,
		NgxSpinnerModule
	],
	declarations: [
		AppComponent,
		HeaderComponent,
		FooterComponent,
		ButtonsmobileComponent
	],
	providers: [],
	bootstrap: [AppComponent],
	schemas: [
		CUSTOM_ELEMENTS_SCHEMA
	]
})
export class AppModule { }
