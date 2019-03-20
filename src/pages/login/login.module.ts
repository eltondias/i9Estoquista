import { LoginPage } from './login';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CommonModule } from '@angular/common';
import {NgxMaskModule} from 'ngx-mask';

@NgModule({
  declarations: [
    LoginPage,
  ],
  imports: [
      CommonModule,
        IonicPageModule.forChild(LoginPage),
        NgxMaskModule
  ],
})
export class LoginPageModule {}
