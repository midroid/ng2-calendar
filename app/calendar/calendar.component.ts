import {Component, OnInit, EventEmitter, Input, Output} from 'angular2/core';
import {RouteParams, Router, RouterLink} from 'angular2/router';
import {CanDeactivate, ComponentInstruction} from 'angular2/router';
import 'rxjs/Rx';
import {Http} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
declare var moment: any;

@Component({
    selector    : 'ng2-calendar',
    templateUrl : 'app/calendar/calendar.template.html',
    styleUrls   : ['app/calendar/calendar.style.css'],
})

export class CalendarComponent implements OnInit {
    
    public today : string = moment().format('D MMMM YYYY');
    public mod : string = moment();
    public selected : string;
    public month : string;
    public date1 : string;
    public test : string = moment();
    public weeks : [];
    public holidayList : any[] = [];
    @Output() dayClicked = new EventEmitter<any>();
    
    constructor() {
        this.mod = this.removeTime(this.mod);
        this.test.date(1);
    }
    
    ngOnInit() {
        this.selected = this.removeTime(this.selected || moment());
        this.month = this.selected.clone();
        this.start = this.selected.clone();
        this.start.date(1);
        this.removeTime(this.start.day(0));
        this.buildMonth(this.start, this.month);
        //this.holidayList = [];
    }
    
    removeTime(date) {
        return date.day(0).hour(0).minute(0).second(0).millisecond(0);
    }
    
    buildMonth(start, month) {
        this.weeks = [];
        var done = false, date = start.clone(), monthIndex = date.month(), count = 0;
        while (!done) {
            this.weeks.push({ days: this.buildWeek(date.clone(), month) });
            date.add(1, "w");
            done = count++ > 2 && monthIndex !== date.month();
            monthIndex = date.month();
        }
    }
    
    buildWeek(date, month) {
        var days = [];
        for (var i = 0; i < 7; i++) {
            days.push({
                name: date.format("dd").substring(0, 1),
                number: date.date(),
                isCurrentMonth: date.month() === month.month(),
                isToday: date.isSame(new Date(), "day"),
                date: date
            });
            date = date.clone();
            date.add(1, "d");
        }
        return days;
    }
    
    select(day) {
        this.selected = day.date;
        this.dayClicked.emit(day);
        if(this.holidayList.indexOf(day) > -1) {
            var index = this.holidayList.indexOf(day);
            this.holidayList.splice(index, 1);
        } else {
            this.holidayList.push(day);    
        }
        console.log(this.holidayList);
    }
    
    next() {
        var next = this.month.clone();
        this.removeTime(next.month(next.month()+1).date(1));
        this.month.month(this.month.month()+1);
        this.buildMonth(next, this.month);
    }
    
    previous() {
        var previous = this.month.clone();
        this.removeTime(previous.month(previous.month()-1).date(1));
        this.month.month(this.month.month()-1);
        this.buildMonth(previous, this.month);
    }
    
    isInTheList(day) {
        if(this.holidayList.indexOf(day) > -1) {
            return 1;
        }
    }
    
}