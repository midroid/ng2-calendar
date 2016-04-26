System.register(['angular2/core', 'rxjs/Rx'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1;
    var CalendarComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (_1) {}],
        execute: function() {
            CalendarComponent = (function () {
                function CalendarComponent() {
                    this.today = moment().format('D MMMM YYYY');
                    this.mod = moment();
                    this.test = moment();
                    this.holidayList = [];
                    this.dayClicked = new core_1.EventEmitter();
                    this.mod = this.removeTime(this.mod);
                    this.test.date(1);
                }
                CalendarComponent.prototype.ngOnInit = function () {
                    this.selected = this.removeTime(this.selected || moment());
                    this.month = this.selected.clone();
                    this.start = this.selected.clone();
                    this.start.date(1);
                    this.removeTime(this.start.day(0));
                    this.buildMonth(this.start, this.month);
                    //this.holidayList = [];
                };
                CalendarComponent.prototype.removeTime = function (date) {
                    return date.day(0).hour(0).minute(0).second(0).millisecond(0);
                };
                CalendarComponent.prototype.buildMonth = function (start, month) {
                    this.weeks = [];
                    var done = false, date = start.clone(), monthIndex = date.month(), count = 0;
                    while (!done) {
                        this.weeks.push({ days: this.buildWeek(date.clone(), month) });
                        date.add(1, "w");
                        done = count++ > 2 && monthIndex !== date.month();
                        monthIndex = date.month();
                    }
                };
                CalendarComponent.prototype.buildWeek = function (date, month) {
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
                };
                CalendarComponent.prototype.select = function (day) {
                    this.selected = day.date;
                    this.dayClicked.emit(day);
                    if (this.holidayList.indexOf(day) > -1) {
                        var index = this.holidayList.indexOf(day);
                        this.holidayList.splice(index, 1);
                    }
                    else {
                        this.holidayList.push(day);
                    }
                    console.log(this.holidayList);
                };
                CalendarComponent.prototype.next = function () {
                    var next = this.month.clone();
                    this.removeTime(next.month(next.month() + 1).date(1));
                    this.month.month(this.month.month() + 1);
                    this.buildMonth(next, this.month);
                };
                CalendarComponent.prototype.previous = function () {
                    var previous = this.month.clone();
                    this.removeTime(previous.month(previous.month() - 1).date(1));
                    this.month.month(this.month.month() - 1);
                    this.buildMonth(previous, this.month);
                };
                CalendarComponent.prototype.isInTheList = function (day) {
                    if (this.holidayList.indexOf(day) > -1) {
                        return 1;
                    }
                };
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], CalendarComponent.prototype, "dayClicked", void 0);
                CalendarComponent = __decorate([
                    core_1.Component({
                        selector: 'ng2-calendar',
                        templateUrl: 'app/calendar/calendar.template.html',
                        styleUrls: ['app/calendar/calendar.style.css'],
                    }), 
                    __metadata('design:paramtypes', [])
                ], CalendarComponent);
                return CalendarComponent;
            }());
            exports_1("CalendarComponent", CalendarComponent);
        }
    }
});
//# sourceMappingURL=calendar.component.js.map