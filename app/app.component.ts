import {Component} from 'angular2/core';
import {CalendarComponent} from 'app/calendar/calendar.component';
declare var moment : any;

@Component({
    selector: 'my-app',
    template: '<h1>Angular Calendar Example</h1><ng2-calendar></ng2-calendar>'
    styleUrls : ['app/calendar/calendar.style.css'],
    directives : [CalendarComponent]
})
export class AppComponent { }
