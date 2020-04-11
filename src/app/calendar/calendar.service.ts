import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { map} from 'rxjs/operators';
import {environment} from '../../environments/environment';

  const url = environment.API + '/ws/time_line';

@Injectable()
export class CalendarService implements Resolve<any> {
  events: any;
  onEventsUpdated: Subject<any>;

  constructor(
    private httpClient: HttpClient) {
    // Set the defaults
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
    return this.httpClient.get(url + '/all').pipe(
      map(this.extractData)
    );
  }

  getAllOfEvents() {
    return this.httpClient.get(url + '/timelines').pipe(
      map(this.extractData)
    );
  }



  getEventByRef(ref: string) {
    return this.httpClient.get(url + '?ligneTempsReference=' + ref).pipe(
      map(this.extractData)
    );
  }

  private extractData(res: Response) {
    const body = res;
    return body || {};
  }
  getEvents(): Promise<any> {
    return new Promise((resolve, reject) => {

      this.httpClient.get(url + '/all')
        .subscribe((response: any) => {
          this.events = response.data;

          this.onEventsUpdated.next(this.events);

          resolve(this.events);
        }, reject);
    });
  }

  updateEvents(events): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpClient.post('api/calendar/events', {
        id: 'events',
        data: [...events]
      })
        .subscribe((response: any) => {
          this.getEvents();
        }, reject);
    });
  }


  deleteEvent(event) {
    return this.httpClient.delete(url + '?ligneTempsReference=' + event.reference);
  }

  async getAsyncData(obj) {
    // tslint:disable-next-line: max-line-length
    return await this.httpClient.get(`${url}/totaldays?id=${obj.id}&start=${obj.start}&end=${obj.end}`)
      .toPromise()
      .then(data => {
        return data;
      });
  }

  countDays(obj) {
    // tslint:disable-next-line: max-line-length
    return this.httpClient.get(`${url}/totaldays?id=${obj.id}&start=${obj.start}&end=${obj.end}`).pipe(map(this.extractData));
  }

  groupedByDay() {
    return this.httpClient.get(`${url}/grouped`);
  }

  validateTimelines(timeline) {
    const timelineDate = new Date(timeline.timeline.start);
    console.log(timeline);
    const timel = {
      year: timelineDate.getFullYear(),
      month: timelineDate.getMonth() + 1,
      id: timeline.timeline.resource.id
    };
    console.log(timel);
    return this.httpClient.post(`${url}/validate`, timel);
  }

}
