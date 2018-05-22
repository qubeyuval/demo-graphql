import { NgModule } from '@angular/core';
import {
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatGridListModule,
    MatDialogModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
} from '@angular/material';

const modules = [
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatGridListModule,
    MatDialogModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
];

@NgModule({
  imports: modules,
  exports: modules,
})
export class AngularMaterialModule { }
