import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IncrementarPage } from './incrementar';

@NgModule({
  declarations: [
    IncrementarPage,
  ],
  // entryComponents: [
  //   IncrementarPage
  // ],
  imports: [
    IonicPageModule.forChild(IncrementarPage),
    // IonicStorageModule.forRoot()
  ],
  // exports: [IncrementarPage],
  providers: [
  ]
})
export class IncrementarPageModule {}
