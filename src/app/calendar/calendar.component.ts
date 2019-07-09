import {Component, OnInit, ViewEncapsulation, Output, EventEmitter} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {MatDialog, MatDialogRef} from '@angular/material';
import {Observable, Subject} from 'rxjs';
import {isSameDay, isSameMonth, startOfDay} from 'date-fns';
import {CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarMonthViewDay} from 'angular-calendar';

import {FuseConfirmDialogComponent} from '../../@fuse/components/confirm-dialog/confirm-dialog.component';
import {fuseAnimations} from '../../@fuse/animations';
import {CalendarService} from './calendar.service';
import {CalendarEventModel} from './event.model';
import {CalendarEventFormDialogComponent} from './event-form/event-form.component';
import {FuseSidebarService} from '../../@fuse/components/sidebar/sidebar.service';
import {AuthService} from '../shared/services/auth.service';
import {ResourceNavbarService} from '../resource-navbar/rousource-navbar.service';
import {User} from '../shared/entities/user.model';
import {DeveloperService} from '../shared/services/developer.service';
import {Developer} from '../shared/entities/developer.model';
import {UserService} from '../shared/services/user.service';
import { HolidayComponent } from '../holiday/holiday.component';
import { MatDialogModule } from '@angular/material/dialog';
import { PositioningService } from '../shared/services/positioning.service';
import { SharingService } from '../shared/services/sharing.service';


@Component({
  selector: 'calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class CalendarComponent implements OnInit {
  actions: CalendarEventAction[];
  activeDayIsOpen: boolean;
  confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
  dialogRef: any;
  events: any[];
  refresh: Subject<any> = new Subject();
  selectedDay: any;
  view: string;
  viewDate: Date;
  user$: Observable<User>;
  user: User;
  manager: User;
  developer: Developer;
  emailUser: any;
  userRef: any;
  selectedProject;
  eventsCount;

  holiday: HolidayComponent = new HolidayComponent();

  projects = [];
  constructor(
    private auth: AuthService,
    private devService: DeveloperService,
    private userService: UserService,
    private resourceNavbarService: ResourceNavbarService,
    private  _fuseSidebarService: FuseSidebarService,
    private _matDialog: MatDialog,
    private _calendarService: CalendarService,
    private positionningService: PositioningService,
    private sharingService: SharingService) {
      this.view = 'month';
      this.viewDate = new Date();
      this.activeDayIsOpen = false;
      this.selectedDay = { date: startOfDay(new Date()) };

    this.actions = [];
    this.setEvents();
  }

  ngOnInit(): void {
    if (this.auth.isAuthenticated()) {

      this.user$ = this.auth.getCurrentUser();

      this.resourceNavbarService.update.subscribe(() => {
        this.user$ = this.auth.getCurrentUser();
      });

      this.positionningService.getPositionings().subscribe(res => {
        this.projects = res;
      }); 

    }

    this.refresh.subscribe(updateDB => {
      if (updateDB) {
        this._calendarService.updateEvents(this.events);
      }
    });

    this._calendarService.onEventsUpdated.subscribe(events => {
      this.setEvents();
      this.refresh.next();
    });

    this.user$.subscribe(res => {
      const email = res.email;
      this.emailUser = email;
      this.devService.getDeveloperByEmail(this.emailUser).subscribe(response => {
        this.developer = response;
        this.userRef = response.managerReference;

        this.userService.getUser(this.developer.managerReference).subscribe(res => {
          this.manager = res;
        });
      });
    });
  }

  resetMonth(): void{
    this.events = [];
    const month = this.viewDate.getMonth();
    const newDate = new Date();
    newDate.setDate(1);
    let dayOfMonth = 1;
    while (newDate.getMonth() === this.viewDate.getMonth() && dayOfMonth < 31) {
      const startDate = new Date();
      startDate.setDate(dayOfMonth);
      const ev = {
        start: startDate,
        title: this.selectedProject,
        project: this.selectedProject,
        note : '',
        temp : {
          value : 1,
          label : 'Journée'
        }
      }
      dayOfMonth++;
      if (startDate.getDay() !== 6 && startDate.getDay() !== 0 && !this.holiday.isHoliday(startDate)){
        this.events.push(ev);
      }
    }
  }

  isLoggedIn() {
    return this.auth.isAuthenticated();
  }

  isAdmin() {

    return this.auth.isAdmin();
  }

  setEvents(): void {
    this._calendarService.getAllEvents().subscribe(res => {
      const newRes = res as any[];

      const newEv = newRes.map(item => new CalendarEventModel(item));
      this.events = newEv;

    });
  }


  /**
   * Before View Renderer
   *
   * @param {any} header
   * @param {any} body
   */
  beforeMonthViewRender({header, body}): void {
    /**
     * Get the selected day
     */
    const _selectedDay = body.find((_day) => {
      return _day.date.getTime() === this.selectedDay.date.getTime();
    });

    if (_selectedDay) {
      /**
       * Set selected day style
       * @type {string}
       */
      _selectedDay.cssClass = 'cal-selected';
    }

  }

  findEventByDate(date){
    for(let i=0;i<this.events.length;i++){
      if(this.events[i].start == date){
        return this.events[i];
      }
    }
    return null;
  }

  /**
   * Day clicked
   *
   * @param {MonthViewDay} day
   */
  dayClicked(event): void {
    let d = -1;
    
    for(let i=0; i < this.events.length; i++) {
      console.log(JSON.stringify(this.events[i].start).substring(1,11));
      console.log(JSON.stringify(event.day.date).substring(1,11));
      let ndate = new Date(this.events[i].start);
      ndate = new Date(ndate.getDate() + 1);
      console.log(new Date(event.day.date).getTime() == ndate.getTime())
      console.log('--------------------------------------------------------')
      let dt = new Date(JSON.stringify(this.events[i].start).substring(1,11));
      let evDt = new Date(JSON.stringify(event.day.date).substring(1,11));
      if(dt.getTime() == evDt.getTime()){
        d = i;
        break;
      }
    }
    console.log(d);
    let ev = {
      index: d, 
      date: event.day.date,
      project: this.selectedProject,
      events: this.events
    }
    this.sharingService.changeMessage(JSON.stringify(ev));
  }

  /**
   * Event times changed
   * Event dropped or resized
   *
   * @param {CalendarEvent} event
   * @param {Date} newStart
   * @param {Date} newEnd
   */
  eventTimesChanged({event, newStart, newEnd}: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.refresh.next(true);
  }

  /**
   * Delete Event
   *
   * @param event
   */
  deleteEvent(event): void {

    this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
      disableClose: false
    });

    this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';

    this.confirmDialogRef.afterClosed().subscribe(result => {
      if (result) {
        //console.log("DELETING :: ",event.reference);
        const eventIndex = this.events.indexOf(event);
        //this.events.splice(eventIndex, 1);
        this._calendarService.deleteEvent(event).subscribe(res => {
          console.log(res);
        });
        this.refresh.next(true);
      }
      this.confirmDialogRef = null;
    });

  }

  /**
   * Edit Event
   *
   * @param {string} action
   * @param {CalendarEvent} event
   */

  editEventBefore(action: string, event: any) {
    this._calendarService.getEventByRef(event.reference).subscribe(res => {
      this.editEvent(action, res);
    });
  }
  editEvent(action: string, event: any): void {
    this.dayClicked(event);
    sessionStorage.setItem('event', JSON.stringify(event));
    const eventIndex = this.events.indexOf(event);
    this.dialogRef = this._matDialog.open(CalendarEventFormDialogComponent, {
      panelClass: 'event-form-dialog',
      data: {
        event: event,
        action: action
      }
    });

    this.dialogRef.afterClosed()
      .subscribe(response => {
        if (!response) {
          return;
        }
        const actionType: string = response[0];
        const formData: FormGroup = response[1];
        switch (actionType) {
          /**
           * Save
           */
          case 'save':

            this.events[eventIndex] = Object.assign(this.events[eventIndex], formData.getRawValue());
            this.refresh.next(true);

            break;
          /**
           * Delete
           */
          case 'delete':

            this.deleteEvent(event);

            break;
        }
      });
  }

  /**
   * Add Event
   */
  addEvent(): void {


    this.dialogRef = this._matDialog.open(CalendarEventFormDialogComponent, {
      panelClass: 'event-form-dialog',
      data: {
        action: 'new',
        date: this.selectedDay.date
      }
    });

    this.dialogRef.afterClosed()
      .subscribe((response: FormGroup) => {
        if(typeof response != 'undefined'){
          const newEvent = response.getRawValue();
        newEvent.actions = this.actions;
        this.events.push(newEvent);
        this.refresh.next(true);
        }
      });
  }

  toggleSidebar(): void {
    this._fuseSidebarService.getSidebar('my-left-sidebar').toggleOpen();
  }

  validateTimeSheet() {
    console.log(this.events)
  }
}
