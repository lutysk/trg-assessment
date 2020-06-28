import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-location-autocomplete',
  templateUrl: './location-autocomplete.component.html',
  styleUrls: ['./location-autocomplete.component.scss']
})
export class LocationAutocompleteComponent implements AfterViewInit {
  @ViewChild('locationInput') locationInput: ElementRef;
  @Input('map') map: google.maps.Map;
  @Output('setMarker') setMarker: EventEmitter<any> = new EventEmitter<any>();

  public autocomplete: google.maps.places.Autocomplete;

  constructor() {
  }

  ngAfterViewInit(): void {
    this.initAutocomplete();
  }

  private initAutocomplete(): void {
    this.autocomplete = new google.maps.places.Autocomplete(this.locationInput.nativeElement, {});
    this.autocomplete.bindTo('bounds', this.map);

    this.autocomplete.addListener('place_changed', (res) => {
      this.setMarker.emit(this.autocomplete.getPlace());
    });
  }

}
