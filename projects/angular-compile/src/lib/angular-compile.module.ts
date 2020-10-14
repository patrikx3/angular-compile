import {
    NgModule,
    //ModuleWithProviders,
} from '@angular/core';
import {CompileAttribute} from "./angular-compile.component";
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [
      CompileAttribute
  ],
  imports: [
      CommonModule
  ],
  exports: [
      CompileAttribute
  ]
})
export class CompileModule { }
