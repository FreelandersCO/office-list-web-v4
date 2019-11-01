import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MylistRoutingModule } from './mylist-routing.module';
import { MylistComponent } from './mylist.component';


@NgModule({
  declarations: [MylistComponent],
  imports: [
    CommonModule,
    MylistRoutingModule
  ]
})
export class MylistModule { }
