import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ErroPageRoutingModule } from './erro-routing.module';

import { ErroPage } from './erro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ErroPageRoutingModule
  ],
  declarations: [ErroPage]
})
export class ErroPageModule {}
