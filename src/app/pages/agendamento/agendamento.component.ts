import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-agendamento',
  templateUrl: './agendamento.component.html',
  styleUrls: ['./agendamento.component.less']
})
export class AgendamentoComponent {
	/**
	 * Data selecionada pelo usuário
	 */
	public dateSelected: boolean;

  constructor() {
  	// Sempre nula ao iniciar o componente
  	this.dateSelected = null;
  }

  /**
   * Handler que sera disparado pelo componente calendario
   * 
   * @param  {[type]} item [description]
   * @return {[type]}      [description]
   */
	handleDateSelected(date) {
		this.dateSelected = true;
	}
}
