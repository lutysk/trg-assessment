import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlaceFinderService {
  public searchList$: Subject<google.maps.places.PlaceResult[]> = new BehaviorSubject([]);
  public searchListPagination$: Subject<google.maps.places.PlaceSearchPagination>
    = new Subject<google.maps.places.PlaceSearchPagination>();

  public createSingleMarker$: Subject<google.maps.places.PlaceResult> = new Subject<google.maps.places.PlaceResult>();
  public resetResults$: Subject<boolean> = new Subject<boolean>();

  constructor() {
  }

  public getPlaces(map: google.maps.Map, marker: google.maps.places.PlaceResult): void {
    this.resetResults$.next(true);
    const request = {
      query: marker.name,
      fields: ['name', 'geometry']
    };
    const service = new google.maps.places.PlacesService(map);

    if (marker.id) {
      this.createSingleMarker$.next(marker);
    } else {
      return service.textSearch(request, (results, status, pagination) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          this.searchListPagination$.next(pagination);
          this.searchList$.next(results);
        }
      });
    }
  }
}
