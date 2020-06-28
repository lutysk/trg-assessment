import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { IUserCoords } from '../shared/interfaces';
import { UserLocationService } from '../core/services/user-location/user-location.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { PlaceFinderService } from '../core/services/place-finder/place-finder.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit, OnDestroy {

  @ViewChild('gmap') gmapElement: ElementRef;
  public map: google.maps.Map;
  public mapOptions: google.maps.MapOptions;

  private userLocation: IUserCoords;
  private destroy$: Subject<boolean> = new Subject<boolean>();
  private marker: google.maps.Marker;


  constructor(private locationService: UserLocationService, private placeFinder: PlaceFinderService) {
    this.locationService.userLocation$
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe((coords: IUserCoords) => {
        const position = new google.maps.LatLng(coords.lat, coords.lon);
        this.userLocation = coords;
        this.mapOptions = {
          center: position,
          zoom: coords.lon ? 15 : 1,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          disableDefaultUI: true
        };
      });

    this.placeFinder.createSingleMarker$
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe((mark) => {
        this.resetSingleMarker();
        this.marker = new google.maps.Marker({
          position: mark.geometry.location,
          map: this.map,
          title: mark.name
        });
        this.map.panTo(mark.geometry.location);
        this.map.setZoom(15);
      });
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {
    this.map = new google.maps.Map(this.gmapElement.nativeElement, this.mapOptions);
  }

  public setMarker(markerData): void {
    this.resetSingleMarker();
    this.placeFinder.getPlaces(this.map, markerData);
  }

  private resetSingleMarker(): void {
    if (this.marker) {
      this.marker.setMap(null);
    }
  }

  ngOnDestroy() {
    this.destroy$.next(false);
  }

}
