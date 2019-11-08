import { Component, OnInit, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Observable, Subject } from 'rxjs';
import { isSameDay, isSameMonth, startOfDay } from 'date-fns';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarMonthViewDay } from 'angular-calendar';

import { FuseConfirmDialogComponent } from '../../@fuse/components/confirm-dialog/confirm-dialog.component';
import { fuseAnimations } from '../../@fuse/animations';
import { CalendarService } from './calendar.service';
import { CalendarEventModel } from './event.model';
import { CalendarEventFormDialogComponent } from './event-form/event-form.component';
import { FuseSidebarService } from '../../@fuse/components/sidebar/sidebar.service';
import { AuthService } from '../shared/services/auth.service';
import { ResourceNavbarService } from '../resource-navbar/rousource-navbar.service';
import { User } from '../shared/entities/user.model';
import { DeveloperService } from '../shared/services/developer.service';
import { Developer } from '../shared/entities/developer.model';
import { UserService } from '../shared/services/user.service';
import { HolidayComponent } from '../holiday/holiday.component';
import { MatDialogModule } from '@angular/material/dialog';
import { PositioningService } from '../shared/services/positioning.service';
import { SharingService } from '../shared/services/sharing.service';
import { Globals } from '../shared/global/globals';
import { EventService } from '../shared/services/event.service';
import { ProjectService } from '../shared/services/project.service';
import Swal from 'sweetalert2';
import { AbsenceListService } from '../shared/services/AbsenceListService';
import { AbsenceService } from '../shared/services/AbsenceService';
import { AbsenceList } from '../shared/entities/AbsenceList.model';
import { Absence } from '../shared/entities/Absence.model';



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

  total = {
    production: 0,
    interne: 0,
    absence: 0
  }

  daysTotal = 0;
  openDays = 0;

  projects = [];
  allProject = [];
  constructor(
    private auth: AuthService,
    private devService: DeveloperService,
    private userService: UserService,
    private resourceNavbarService: ResourceNavbarService,
    private _fuseSidebarService: FuseSidebarService,
    private _matDialog: MatDialog,
    private _calendarService: CalendarService,
    private positionningService: PositioningService,
    private sharingService: SharingService,
    private globals: Globals,
    private eventService: EventService,
    private projectService: ProjectService,
    private absenceListService: AbsenceListService,
    private absenceService: AbsenceService) {
    this.view = 'month';
    this.viewDate = new Date();
    this.activeDayIsOpen = false;
    this.selectedDay = { date: startOfDay(new Date()) };

    this.actions = [];
  }

  ngOnInit(): void {
    //this.countOpenDays();
    this.positionningService.getPositioningsRsource().subscribe(res => {
      this.projects = res as [];
      this.allProject = res;
      this.setEvents();
    });

    if (this.auth.isAuthenticated()) {

      this.user$ = this.auth.getCurrentUser();

      this.resourceNavbarService.update.subscribe(() => {
        this.user$ = this.auth.getCurrentUser();
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
    });
  }

  countOpenDays() {
    this.openDays = 0;
    let startDate = this.viewDate;
    startDate.setDate(1);

    let endDate = startDate;
    endDate.setMonth(startDate.getMonth() + 1);
    endDate.setDate(endDate.getDate() - 1);

    for (let i = 0; i < endDate.getDate() - 1; i++) {
      let d = startDate;
      d.setDate(startDate.getDate() + i);
      if (d.getDay() !== 0 && d.getDay() !== 6 && !this.holiday.isHoliday(d)) {
        this.openDays++;
      }
    }

    console.log(this.openDays)
  }

  resetMonth() {

    this.events = [];
    const startDate = new Date(this.viewDate);
    let i = 1;
    //startDate.setMonth(this.viewDate.getMonth());
    console.log('VIEW :: ', this.viewDate, ' :: ', startDate)
    while (startDate.getMonth() == this.viewDate.getMonth()) {
      startDate.setDate(i);
      const ev = {
        start: new Date(startDate),
        title: this.selectedProject,
        project: this.selectedProject,
        type: { label: '', value: '' },
        note: '',
        temp: {
          value: 1,
          label: 'Journée'
        }
      }

      if (startDate.getDay() !== 6 && startDate.getDay() !== 0 && !this.holiday.isHoliday(startDate) &&
        startDate.getMonth() == this.viewDate.getMonth()) {
        this.events.push(ev);
      }
      i++;
    }
    this.globals.events = this.events;
  }

  resetMonth4() {
    this.events = [];
    this.positionningService.getPositioningsRsource().subscribe(res => {

      this._calendarService.getAllEvents().subscribe(res => {
        const newRes = res as any[];
        const newEv = newRes.map(item => {
          const temp = { label: '', value: item.timeWork };

          if (item.timeWork === 0) {
            temp.label = 'Absent';
          } else if (item.timeWork === 1) {
            temp.label = 'Journée';
          } else {
            temp.label = 'Demi Journée';
          }

          item.project = this.getProjectByRef(item.project);

          item.temp = temp;
          item.start = new Date(item.start);
          return item;
        });
        this.events = newEv;

        const startDate = new Date();
        startDate.setDate(1);
        let i = 1;
        startDate.setMonth(this.viewDate.getMonth());
        console.log(startDate.getMonth(), ' ? == ', this.viewDate.getMonth())
        while (startDate.getMonth() == this.viewDate.getMonth() && startDate.getFullYear() == this.viewDate.getFullYear()) {
          startDate.setDate(i);
          const ev = {
            start: new Date(startDate),
            title: this.selectedProject,
            project: this.selectedProject,
            type: { label: '', value: '' },
            note: '',
            temp: {
              value: 1,
              label: 'Journée'
            }
          }

          if (startDate.getDay() !== 6 && startDate.getDay() !== 0 &&
            !this.holiday.isHoliday(startDate) &&
            startDate.getMonth() == this.viewDate.getMonth()) {
            this.events.push(ev);
          }
          i++;
        }
        console.log(this.events);
        this.globals.events = this.events.filter(e =>
          e.start.getMonth() === this.viewDate.getMonth() && e.start.getFullYear() === this.viewDate.getFullYear());
      });
    });

  }
  resetMonth2(): void {
    this.events = [];
    const month = this.viewDate.getMonth();
    const newDate = new Date();
    newDate.setDate(1);
    newDate.setMonth(this.viewDate.getMonth());
    let dayOfMonth = 1;
    while (newDate.getMonth() === this.viewDate.getMonth() && dayOfMonth < 31) {
      const startDate = new Date();
      startDate.setDate(dayOfMonth);
      const ev = {
        start: new Date(startDate),
        title: this.selectedProject,
        project: this.selectedProject,
        note: '',
        temp: {
          value: 1,
          label: 'Journée'
        }
      }
      dayOfMonth++;
      if (startDate.getDay() !== 6 && startDate.getDay() !== 0 && !this.holiday.isHoliday(startDate)) {
        this.events.push(ev);
      }
    }
    this.globals.events = this.events;
  }

  isLoggedIn() {
    return this.auth.isAuthenticated();
  }

  isAdmin() {

    return this.auth.isAdmin();
  }

  getProjectByRef(ref) {
    let p = null;
    for (let i = 0; i < this.allProject.length; i++) {
      if (this.allProject[i].reference == ref) {
        p = this.allProject[i];
        break;
      }
    }
    return p;
  }

  setPartialEvents(): void {

    this._calendarService.getAllEvents().subscribe(res => {
      const newRes = res as any[];
      const newEv = newRes.map(item => {
        const temp = { label: '', value: item.timeWork };

        if (item.timeWork === 0) {
          this.total.absence++;
          temp.label = 'Absent';
        } else if (item.timeWork === 1) {
          this.total.production++;
          temp.label = 'Journée';
        } else {
          this.total.interne++;
          temp.label = 'Demi Journée';
        }

        item.project = this.getProjectByRef(item.project);

        item.temp = temp;
        item.start = new Date(item.start);
        return item;
      });
      this.events = newEv;
    });
  }


  setEvents(): void {

    this._calendarService.getAllEvents().subscribe(res => {
      const newRes = res as any[];
      const newEv = newRes.map(item => {
        const temp = { label: '', value: item.timeWork };

        if (item.timeWork === 0) {
          this.total.absence++;
          temp.label = 'Absent';
        } else if (item.timeWork === 1) {
          this.total.production++;
          temp.label = 'Journée';
        } else {
          this.total.interne++;
          temp.label = 'Demi Journée';
        }

        item.project = this.getProjectByRef(item.project);

        item.temp = temp;
        item.start = new Date(item.start);
        return item;
      });
      this.events = newEv;
      if (this.events.length === 0) {
        this.selectedProject = this.projects[0];
        this.resetMonth();
      }
    });
  }


  /**
   * Before View Renderer
   *
   * @param {any} header
   * @param {any} body
   */
  beforeMonthViewRender({ body }): void {
    body.forEach(day => {
      if (day.events.length > 0) {
        day.badgeTotal = -2;
      }
    });

  }

  findEventByDate(date) {
    for (let i = 0; i < this.events.length; i++) {
      if (this.events[i].start == date) {
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
    localStorage.setItem('date', event.day.date);
    let d = -1;

    for (let i = 0; i < this.events.length; i++) {

      let ndate = event.day.date;
      if (ndate.toDateString() == this.events[i].start.toDateString()) {
        d = i;
        break;
      }
    }
    let ev = {
      index: d,
      date: event.day.date,
      project: this.selectedProject,
      events: this.events
    }
    this.sharingService.changeMessage(JSON.stringify(ev));
    this.globals.events = this.events;
  }

  /**
   * Event times changed
   * Event dropped or resized
   *
   * @param {CalendarEvent} event
   * @param {Date} newStart
   * @param {Date} newEnd
   */
  eventTimesChanged({ event, newStart, newEnd }: CalendarEventTimesChangedEvent): void {
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
        const eventIndex = this.events.indexOf(event);
        this._calendarService.deleteEvent(event).subscribe(res => {
        });
        this.refresh.next(true);
      }
      this.confirmDialogRef = null;
    });

  }

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
        if (typeof response != 'undefined') {
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

  getValueWorked(temp, project) {
    if (temp.value == 0) {
      this.total.absence++;
    } else {
      if (project.client.toString().toLowerCase() == 'interne') {
        this.total.interne += temp.value;
      } else {
        this.total.production += temp.value;
      }
      this.total.absence = this.total.absence + (1 - temp.value)
    }
  }

  dateChange() {
    this.events = [];
    this.setPartialEvents();
    console.log('VIEW DATE :: ', this.viewDate);
  }

  validateTimeSheet() {
    let absenceList = new AbsenceList();
    Swal.fire(
      'TimeSheet Envoyée!',
      '',
      'success'
    );
    console.log(this.globals.events[0]);
    let list = {
      resource: this.globals.events[0].resource,
      date: this.globals.events[0].start
    };
    this.eventService.saveTimeList(list).subscribe(res => {
      console.log(res)
      for (let i = 0; i < this.globals.events.length; i++) {

        if (this.globals.events[i].temp.value !== 1) {


          console.log(absenceList)
          this.absenceListService.createNewAbsenceList().subscribe(res => {
            let d = this.globals.events[i].start;
            let duree = this.globals.events[i].temp.value;
            let absence = new Absence();
            let abs = this.globals.events[i];

            absence.type = 'cp';
            absence.state = 'NV';
            absence.dateAbsence = d.setDate(d.getDate() - 1);
            absence.duration = duree == 0 ? 1 : duree;
            absence.absenceListReference = res.reference;

            console.log(absence)
            this.absenceService.createAbsence(absence).subscribe(rest => {
              console.log(rest)
            })
          });
        }

        this.getValueWorked(this.globals.events[i].temp, this.globals.events[i].project);
        this.globals.events[i].listTemps = res;
        this.events[i].start.setDate(this.events[i].start.getDate() + 1);
        this.eventService.saveTimeLine(this.globals.events[i]).subscribe(() => {
          //
        });
      }
    })
  }
}
