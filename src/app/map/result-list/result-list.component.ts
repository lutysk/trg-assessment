import { Component, HostListener, Input, OnDestroy } from '@angular/core';
import { PlaceFinderService } from "../../core/services/place-finder/place-finder.service";
import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";
import { PageEvent } from "@angular/material/paginator";

@Component({
  selector: 'app-result-list',
  templateUrl: './result-list.component.html',
  styleUrls: ['./result-list.component.scss']
})
export class ResultListComponent implements OnDestroy {
  private _dataList: google.maps.places.PlaceResult[] = [];
  private dataListPagination: google.maps.places.PlaceResult[][] = [];
  destroy$: Subject<boolean> = new Subject<boolean>();

  @Input('map') map: google.maps.Map;

  set dataList(list: google.maps.places.PlaceResult[]) {
    this._dataList = list;
    if (list.length) {
      this.dataListPagination.push(list);
    }
    this.createMarkers();
  }

  get dataList(): google.maps.places.PlaceResult[] {
    return this._dataList;
  }

  public pagination: google.maps.places.PlaceSearchPagination;
  private markers: google.maps.Marker[] = [];
  public paginatorLength: number = 20;

  @HostListener('mouseover', ['$event'])
  hoverLocation(event: MouseEvent) {
  }

  constructor(private placeFinder: PlaceFinderService) {
    this.placeFinder.searchListPagination$
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe((pagination) => {
        this.pagination = pagination;
        if (this.pagination.hasNextPage) {
          this.paginatorLength += 20;
        }
      });

    this.placeFinder.searchList$
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe((res) => {
        this.dataList = res;
      });

    this.placeFinder.resetResults$
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.dataList = [];
        this.dataListPagination = [];
      })
  }

  private createMarkers(): void {
    this.resetMarkers();
    this.dataList.forEach((location) => {
      if (location?.geometry.location) {
        const marker = new google.maps.Marker({
          position: location.geometry.location,
          map: this.map,
          title: location.name
        });
        this.markers.push(marker);
      }
    });
    if (this.dataList.length) {
      this.map.panTo(this.dataList[0].geometry.location);
      this.map.setZoom(15);
    }
  }

  private resetMarkers(): void {
    if (this.markers.length) {
      this.markers.forEach((marker) => {
        marker.setMap(null);
      });
      this.markers = [];
    }
  }

  public changePage(event: PageEvent): void {
    if (event.pageIndex > event.previousPageIndex && !this.dataListPagination[event.pageIndex]) {
      this.pagination.nextPage();
    } else {
      this.dataList = this.dataListPagination[event.pageIndex];
    }
  }

  public highlightMarker(ind: number): void {
    if (this.markers.length) {
      this.markers[ind].setAnimation(google.maps.Animation.BOUNCE);
    }
  }

  public removeHighlight(ind: number): void {
    if (this.markers.length) {
      this.markers[ind].setAnimation(null);
    }
  }

  ngOnDestroy() {
    this.destroy$.next(true);
  }
}
