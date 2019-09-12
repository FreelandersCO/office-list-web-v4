import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        SharedModule
    ],
    providers: [],
    bootstrap: [AppComponent],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class AppModule { }
