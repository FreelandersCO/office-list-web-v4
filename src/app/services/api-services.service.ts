import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// tslint:disable-next-line: import-blacklist
import { Observable, throwError } from 'rxjs';
import { retry, catchError, zip } from 'rxjs/operators';

import { environment } from '@env/environment';

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

	// tslint:disable-next-line: ban-types
	getBussinesList(country, state, city, zipCode): Observable<Object> {
		const limit = '6';
		// tslint:disable-next-line: no-magic-numbers
		const exclude = '';
		const headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
		}).set('limit', limit).set('exclude', exclude);

		const url = (zipCode === undefined) ?
			`${this.apiURL}/BusinessCenter/List/${country}/${state}/${city}/` :
			`${this.apiURL}/BusinessCenter/List/${country}/${state}/${city}/${zipCode}`;

		return this.http.get(url, { headers })
			.pipe(
				retry(1),
				catchError(this.handleError)
			);
	}
	// tslint:disable-next-line: ban-types
	getBussinesDetails(id): Observable<Object> {
		return this.http.get(`${this.apiURL}/BusinessCenter/Details/${id}`)
			.pipe(
				retry(1),
				catchError(this.handleError)
			);
	}
	// tslint:disable-next-line: ban-types
	getCoordinates(country, state, city): Observable<Object> {
		return this.http.get(`${this.apiURL}/BusinessCenter/Coordinates/${country}/${state}/${city}`)
			.pipe(
				retry(1),
				catchError(this.handleError)
			);
	}

	// tslint:disable-next-line: ban-types
	getMapBC(country, state, city): Observable<Object> {
		return this.http.get(`${this.apiURL}/BusinessCenter/MapInfo/${country}/${state}/${city}`)
			.pipe(
				retry(1),
				catchError(this.handleError)
			);
	}
	// tslint:disable-next-line: ban-types
	getCityList(): Observable<Object> {
		return this.http.get(`${this.apiURL}/AutoComplete/City/`)
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
