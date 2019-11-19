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

	constructor(private http: HttpClient) { }

	@Cacheable()
	getBussinesList(country, state, city, zipCode, excludeArray, distance): Observable<PageBussines> {
		const exclude = excludeArray.join(',');
		const headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Access-Control-Allow-Methods': 'GET'
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
	getAreasFilter(country, state, city, zipCode, distance): Observable<PageBussines> {
		const headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Access-Control-Allow-Methods': 'GET'
		}).set('distance', distance);

		const url = (zipCode === undefined) ?
			`${this.apiURL}/BusinessCenter/Areas/${country}/${state}/${city}/` :
			`${this.apiURL}/BusinessCenter/Areas/${country}/${state}/${city}/${zipCode}`;

		return this.http.get<PageBussines>(url, { headers })
			.pipe(
				retry(1),
				catchError(this.handleError)
			);
	}
	@Cacheable()
	getBussinesDetails(id): Observable<Object> {
		const headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Access-Control-Allow-Methods': 'GET'
		});
		return this.http.get(`${this.apiURL}/BusinessCenter/Details/${id}`, { headers })
			.pipe(
				retry(1),
				catchError(this.handleError)
			);
	}

	@Cacheable()
	getReduceBussinesDetails(id): Observable<Object> {
		const headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Access-Control-Allow-Methods': 'GET'
		}).set('reduce', 'true');

		return this.http.get(`${this.apiURL}/BusinessCenter/Details/${id}`, { headers })
			.pipe(
				retry(1),
				catchError(this.handleError)
			);
	}

	@Cacheable()
	// tslint:disable-next-line: ban-types
	getMapBC(country, state, city, zipCode, distance): Observable<Object> {
		const headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Access-Control-Allow-Methods': 'GET'
		}).set('distance', distance);
		const url = (zipCode === undefined) ?
			`${this.apiURL}/BusinessCenter/MapInfo/${country}/${state}/${city}/` :
			`${this.apiURL}/BusinessCenter/MapInfo/${country}/${state}/${city}/${zipCode}`;

		return this.http.get(url, { headers })
			.pipe(
				retry(1),
				catchError(this.handleError)
			);
	}

	@Cacheable()
	// tslint:disable-next-line: ban-types
	filterBc(country, state, city, zipCode, distance, areas): Observable<Object> {
		const headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Access-Control-Allow-Methods': 'GET'
		})
		.set('distance', distance)
		.set('areas', areas);
		const url = (zipCode === undefined) ?
			`${this.apiURL}/BusinessCenter/Filter/${country}/${state}/${city}/` :
			`${this.apiURL}/BusinessCenter/Filter/${country}/${state}/${city}/${zipCode}`;

		return this.http.get(url, { headers })
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

	@Cacheable()
	getMyList(token): Observable<Object> {
		const headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Access-Control-Allow-Methods': 'GET'
		})
		.set('authorization', token);

		return this.http.get(`${this.apiURL}/User/List`, { headers })
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
