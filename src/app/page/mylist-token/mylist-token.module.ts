import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MylistTokenRoutingModule } from './mylist-token-routing.module';
import { MylistTokenComponent } from './mylist-token.component';


@NgModule({
  declarations: [MylistTokenComponent],
  imports: [
    CommonModule,
    MylistTokenRoutingModule
  ]
})
export class MylistTokenModule { }
