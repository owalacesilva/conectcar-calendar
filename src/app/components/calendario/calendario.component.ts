import { Component, OnInit, Output, EventEmitter }from '@angular/core';
import { Http, Response, Headers, RequestOptions }from '@angular/http';
import { ApiService }                             from './../../shared/api.service';
import { DateCalendar }                           from './../../classes/date_calendar';
import { Observable }                             from 'rxjs/Rx';
import * as moment                                from 'moment';
import 'moment/locale/pt-br';

@Component({
  selector: 'calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.less'],
  providers: [ ApiService ]
})
export class CalendarioComponent implements OnInit {

	@Output() dateSelected = new EventEmitter();

	private dates: Array<DateCalendar>;
	private today;
	private month;
	private year;
	private dia_partida: Object;
	private date_formatted;

  constructor(private api_service: ApiService) {
		this.dates          = new Array();
		this.today          = new Date();
		this.month          = Number(this.today.getMonth());
		this.year           = Number(this.today.getFullYear());
		this.date_formatted = moment(this.today);
  }

  ngOnInit() {
  	this.drawCalendar();
  }

  /**
   * Desenha os dias no calendario
   */
	drawCalendar(): void {
		let year       = this.year;
		let month      = this.month;
		let days       = this.getDaysInMonth(month + 1, year);
		let first_day  = new Date(year, month, 1);
		let initial    = first_day.getDay();
		let dia_inicio = moment(first_day);
		let dia_fim    = moment(first_day).add('day', days);

		this.date_formatted = moment(first_day);
		this.dates          = [];

		days += initial;

	  for (let i = 0; i < initial; i++) {
			let date_calendar      = new DateCalendar();
			date_calendar.dia      = null;
			date_calendar.selected = false;

	    this.dates.push(date_calendar);
	  }

		for (let i = initial; i < days; i++) {
			let dia = i - initial + 1;

			let date_calendar      = new DateCalendar();
			date_calendar.dia      = i - initial + 1;
			date_calendar.disable  = ( moment(new Date(year, month, dia)).format("YYYY-MM-DD") < moment(new Date()).format("YYYY-MM-DD"));
			date_calendar.active   = ( moment(new Date(year, month, dia)).format("YYYY-MM-DD") == moment(new Date()).format("YYYY-MM-DD"));
			date_calendar.selected = false;

	    this.dates.push(date_calendar);
		}

		this.api_service.getAgendamentos({
			dia_inicio: dia_inicio.format('YYYY-MM-DD'),
			dia_fim: dia_fim.format('YYYY-MM-DD')
		}).map((result) => {
			let dates = result;
			dates.forEach(function(item, index) {
				for (let i = 0; i < this.dates.length; i++) {
					// do nothing
				}
			});

			if(dates.length) {
				//this.changeDate(dates[0]);
			}
		});
	}

	/**
	 * Retorna o numero de dias no mes atual
	 * 
	 * @param  {[type]} month [description]
	 * @param  {[type]} year  [description]
	 * @return {[type]}       [description]
	 */
	getDaysInMonth(month, year): number {
	  let days;

	  if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
	  	days = 31;
	  } else if (month == 4 || month == 6 || month == 9 || month == 11) {
	  	days = 30;
	  } else if (month == 2) {
	    if (this.isLeapYear(year)) {
	      days = 29;
	    } else {
	      days = 28;
	    }
	  }

	  return days;
	}

	/**
	 * Verifica se é ano bisexto
	 * 
	 * @param  {[type]}  Year [description]
	 * @return {Boolean}      [description]
	 */
	isLeapYear(Year): boolean {
	  if (((Year % 4) == 0) && ((Year % 100) != 0) || ((Year % 400) == 0)) {
	    return true;
	  } else {
	    return false;
	  }
	}

	/**
	 * Volta um mes no calendario
	 */
	setPreviousMonth(): void {
    if (this.month == 0) {
      this.month = 11;
      if (this.year > 1000) {
        this.year--;
      }
    } else {
      this.month--;
    }

    this.drawCalendar();
	}

	/**
	 * Avança um mes no calendario
	 */
	setNextMonth(): void {
    if (this.month == 11) {
      this.month = 0;
      this.year++;
    } else {
      this.month++;
    }

    this.drawCalendar();
	}

	/**
	 * [isFourDigitYear description]
	 * 
	 * @param  {[type]}  year [description]
	 * @return {Boolean}      [description]
	 */
	isFourDigitYear(year): boolean {
	  if (year.length != 4) {
	  	return false;
	  } else {
	    return true;
	  }
	}

	/**
	 * Seleciona uma nova data
	 *
	 * @param  {[type]} date [description]
	 * @return {[type]}      [description]
	 */
	changeDate(date) {
		if(!date.disable) {
			this.dates.forEach((date) => {
				date.selected = false;
			});

			date.selected = true;
			this.dateSelected.emit(date);
		}
	}
}
