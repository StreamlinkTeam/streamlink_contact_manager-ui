import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable, Subject} from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable()
export class CalendarService implements Resolve<any> {
  events: any;
  onEventsUpdated: Subject<any>;
  url = environment.API;

  constructor(private _httpClient: HttpClient) {
    this.onEventsUpdated = new Subject();
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return new Promise((resolve, reject) => {
      Promise.all([
        this.getEvents()
      ]).then(
        ([events]: [any]) => {
          resolve();
        },
        reject
      );
    });
  }

  getAllEvents() {
    return this._httpClient.get(this.url + '/ws/time_line/all').pipe(
      map(this.extractData)
    );
  }
  
  getEventByRef(ref: string) {
    return this._httpClient.get(this.url + '/ws/time_line?ligneTempsReference='+ref).pipe(
      map(this.extractData)
    );
  }

  private extractData(res: Response) {
    const body = res;
    return body || { };
  }
  getEvents(): Promise<any> {
    return new Promise((resolve, reject) => {

      this._httpClient.get(this.url + '/ws/time_line/all')
        .subscribe((response: any) => {
          this.events = response.data;

          this.onEventsUpdated.next(this.events);

          resolve(this.events);
        }, reject);
    });
  }

  /**
   * Update events
   *
   * @param events
   * @returns {Promise<any>}
   */
  updateEvents(events): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient.post('api/calendar/events', {
        id: 'events',
        data: [...events]
      })
        .subscribe((response: any) => {
          this.getEvents();
        }, reject);
    });
  }


  deleteEvent(event){
    return this._httpClient.delete(this.url + 'ws/time_line?ligneTempsReference=' + event.reference);
  }

}
