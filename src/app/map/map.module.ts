import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapRoutingModule } from './map-routing.module';
import { MapComponent } from './map.component';
import { SharedModule } from "../shared/shared.module";
import { ResultListComponent } from './result-list/result-list.component';
import { PlaceDetailsComponent } from './place-details/place-details.component';

@NgModule({
  declarations: [MapComponent, ResultListComponent, PlaceDetailsComponent],
  imports: [
    CommonModule,
    MapRoutingModule,
    SharedModule
  ]
})
export class MapModule { }
