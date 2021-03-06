import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AuthGuardService } from './services/auth/auth-guard.service';
import { AuthService } from './services/auth/auth.service';
import { NotFound404Module } from './layout/not-found404/not-found404.module';

@NgModule({
	imports: [
		BrowserAnimationsModule,
		BrowserModule.withServerTransition({ appId: 'serverApp' }),
		HttpClientModule,
		AppRoutingModule,
		SharedModule,
		NgxSpinnerModule,
		NotFound404Module
	],
	declarations: [
		AppComponent,
		HeaderComponent,
		FooterComponent
	],
	providers: [
		AuthGuardService,
		AuthService,
		{ provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
		JwtHelperService
	],
	bootstrap: [AppComponent],
	schemas: [
		CUSTOM_ELEMENTS_SCHEMA
	]
})
export class AppModule { }
