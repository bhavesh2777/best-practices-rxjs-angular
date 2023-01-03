import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY } from 'rxjs';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getApi<ModelType>(url: string, headers = {}) {
    return this.http
      .get<ModelType>(url, { headers })
      .pipe(catchError(this.handleError));
  }

  postApi<ModelType>(url: string, body = {}, headers = {}) {
    return this.http
      .post<ModelType>(url, body, { headers })
      .pipe(catchError(this.handleError));
  }

  putApi<ModelType>(url: string, body = {}, headers = {}) {
    return this.http
      .put<ModelType>(url, body, { headers })
      .pipe(catchError(this.handleError));
  }

  deleteApi(url: string, headers = {}) {
    return this.http
      .delete(url, { headers })
      .pipe(catchError(this.handleError));
  }

  private handleError() {
    return EMPTY;
  }
}
