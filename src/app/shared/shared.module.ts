import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationAutocompleteComponent } from './location-autocomplete/location-autocomplete.component';

import { MatInputModule } from "@angular/material/input";
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { MatPaginatorModule } from "@angular/material/paginator";


import { ModalLocationInfoComponent } from './modal-location-info/modal-location-info.component';


@NgModule({
  declarations: [LocationAutocompleteComponent, ModalLocationInfoComponent],
  exports: [
    LocationAutocompleteComponent,
    MatPaginatorModule,
    MatButtonModule,
    MatInputModule
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatPaginatorModule
  ],
  entryComponents: [
    ModalLocationInfoComponent
  ]
})
export class SharedModule { }
