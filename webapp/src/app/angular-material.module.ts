import { NgModule } from '@angular/core';
import {
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatGridListModule,
    MatDialogModule,
    MatToolbarModule
} from '@angular/material';

const modules = [
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatGridListModule,
    MatDialogModule,
    MatToolbarModule
];

@NgModule({
  imports: modules,
  exports: modules,
})
export class AngularMaterialModule { }
