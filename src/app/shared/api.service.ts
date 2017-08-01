import { Injectable }                             from '@angular/core';
import { Http, Response, Headers, RequestOptions }from '@angular/http';
import { Observable }                             from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ApiService {
	/**
	 * URL do webservice
	 *
	 * @type {String}
	 */
	private api_url = 'http://localhost:3000/api';

	/**
	 * Construtor
	 *
	 * @param  {[type]} private _http:        Http [description]
	 * @return {[type]}         [description]
	 */
  constructor (private _http: Http) {}

  /**
   * Rota para buscar os dias disponiveis
   *
   * @type {[type]}
   */
	getAgendamentos(params: Object) : Observable<Object[]> {

		// Concatenar os parametros recebidos.
		return this._http.get(this.api_url + "/dias_disponiveis")
     	.map((res:Response) => res.json());
	}
}
