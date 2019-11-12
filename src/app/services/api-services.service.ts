import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// tslint:disable-next-line: import-blacklist
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Cacheable } from 'ngx-cacheable';

import { environment } from '@env/environment';
export interface PageBussines {
	// tslint:disable-next-line: ban-types
	businesCenters: Object;
	// tslint:disable-next-line: ban-types
	pageInfo: Object;
}
@Injectable({
	providedIn: 'root'
})
export class ApiServicesService {
	apiURL = environment.apiUrl;
	// Http Options
	httpOptions = {
		headers: new HttpHeaders({
			'Content-Type': 'application/json',
			'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
		})
	};

	constructor(private http: HttpClient) { }

	@Cacheable()
	getBussinesList(country, state, city, zipCode, excludeArray, distance): Observable<PageBussines> {
		const exclude = excludeArray.join(',');
		const headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
		}).set('exclude', exclude).set('distance', distance);

		const url = (zipCode === undefined) ?
			`${this.apiURL}/BusinessCenter/List/${country}/${state}/${city}/` :
			`${this.apiURL}/BusinessCenter/List/${country}/${state}/${city}/${zipCode}`;

		return this.http.get<PageBussines>(url, { headers })
			.pipe(
				retry(1),
				catchError(this.handleError)
			);
	}

	@Cacheable()
	getBussinesDetails(id): Observable<Object> {
		return this.http.get(`${this.apiURL}/BusinessCenter/Details/${id}`)
			.pipe(
				retry(1),
				catchError(this.handleError)
			);
	}

	@Cacheable()
	// tslint:disable-next-line: ban-types
	getMapBC(country, state, city): Observable<Object> {
		return this.http.get(`${this.apiURL}/BusinessCenter/MapInfo/${country}/${state}/${city}`)
			.pipe(
				retry(1),
				catchError(this.handleError)
			);
	}

	@Cacheable()
	getCityList(): Observable<Object> {
		return this.http.get(`${this.apiURL}/AutoComplete/City/`)
			.pipe(
				retry(1),
				catchError(this.handleError)
			);
	}

	setRegistry(data) {
		return this.http.post(`${this.apiURL}/User/Register/`, data)
			.pipe(
				retry(1),
				catchError(this.handleError)
			);
	}
	setLogin(data) {
		return this.http.post(`${this.apiURL}/User/Login/`, data)
			.pipe(
				retry(1),
				catchError(this.handleError)
			);
	}
	// Error handling
	handleError(error) {
		let errorMessage = '';
		if (error.error instanceof ErrorEvent) {
			// Get client-side error
			errorMessage = error.error.message;
		} else {
			// Get server-side error
			errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
		}
		console.error(errorMessage);

		return throwError(errorMessage);
	}
}
