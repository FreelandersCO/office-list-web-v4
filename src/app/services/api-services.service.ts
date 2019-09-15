import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// tslint:disable-next-line: import-blacklist
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

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
    getBussinesList(country, state, city): Observable<Object> {
        return this.http.get(this.apiURL + '/BusinessCenter/' + country + '/' + state + '/' + city)
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
