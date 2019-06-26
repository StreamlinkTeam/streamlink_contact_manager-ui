import {Component, OnInit, ViewEncapsulation} from '@angular/core';
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
  eventsCount;

  constructor(
    private auth: AuthService,
    private devService: DeveloperService,
    private userService: UserService,
    private resourceNavbarService: ResourceNavbarService,
    private  _fuseSidebarService: FuseSidebarService,
    private _matDialog: MatDialog,
    private _calendarService: CalendarService
  ) {
    // Set the defaults
    this.view = 'month';
    this.viewDate = new Date();
    this.activeDayIsOpen = true;
    this.selectedDay = {date: startOfDay(new Date())};

    this.actions = [
      {
        label: '<i class="material-icons s-16">edit</i>',
        onClick: ({event}: { event: CalendarEvent }): void => {
          this.editEvent('edit', event);
        }
      },
      {
        label: '<i class="material-icons s-16">delete</i>',
        onClick: ({event}: { event: CalendarEvent }): void => {
          this.deleteEvent(event);
        }
      }
    ];

    /**
     * Get events from service/server
     */
    this.setEvents();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {


    if (this.auth.isAuthenticated()) {

      this.user$ = this.auth.getCurrentUser();

      this.resourceNavbarService.update.subscribe(() => {
        this.user$ = this.auth.getCurrentUser();
      });

    }
    /**
     * Watch re-render-refresh for updating db
     */
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
    });

    this.devService.getDeveloperByEmail(this.emailUser).subscribe(response => {
      this.developer = response;
      this.userRef = response.managerReference;

      this.userService.getUser(this.developer.managerReference).subscribe(res => {
        this.manager = res;
      });
    });



  }

  isLoggedIn() {
    return this.auth.isAuthenticated();
  }

  isAdmin() {

    return this.auth.isAdmin();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Set events
   */
  setEvents(): void {
    /*this.events = this._calendarService.events.map(item => {
      item.actions = this.actions;
      return new CalendarEventModel(item);
    });*/


    this._calendarService.getAllEvents().subscribe(res => {
      const newRes = res as any[];

      const newEv = newRes.map(item => new CalendarEventModel(item));
      console.log("EVENTS :: ",newEv);
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

  /**
   * Day clicked
   *
   * @param {MonthViewDay} day
   */
  dayClicked(day: CalendarMonthViewDay): void {
    const date: Date = day.date;
    const events: CalendarEvent[] = day.events;

    if (isSameMonth(date, this.viewDate)) {
      if ((isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) || events.length === 0) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
    this.selectedDay = day;
    this.refresh.next();
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
        const newEvent = response.getRawValue();
        newEvent.actions = this.actions;
        this.events.push(newEvent);
        this.refresh.next(true);
      });
  }

  toggleSidebar(): void {
    this._fuseSidebarService.getSidebar('my-left-sidebar').toggleOpen();
  }
}


